// يُشغَّل عند بدء الحاوية على Render (قبل next start) لضمان وجود حساب المدير.
// لا يخترع أي كلمة سر: يقرأ فقط من متغيرات البيئة التي يضيفها صاحب المتجر
// في Render Environment Variables. إن لم تكن موجودة، يتخطى الخطوة بأمان.
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

async function main() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.log(
      "[ensure-admin] تخطّي إعداد حساب المدير — أضيفي SUPABASE_SERVICE_ROLE_KEY وADMIN_EMAIL وADMIN_PASSWORD في Render Environment Variables ثم أعيدي التشغيل.",
    );
    return;
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  let userId = null;

  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
    user_metadata: { full_name: "مدير المتجر" },
  });

  if (created?.user) {
    userId = created.user.id;
    console.log("[ensure-admin] تم إنشاء حساب المدير بنجاح.");
  } else if (createError) {
    const alreadyExists = /already.*registered|already.*exists/i.test(createError.message ?? "");
    if (!alreadyExists) {
      console.error("[ensure-admin] فشل إنشاء حساب المدير:", createError.message);
      return;
    }

    // الحساب موجود مسبقًا — نجد المستخدم ونزامن كلمة السر مع القيمة الحالية في Render
    let page = 1;
    while (!userId) {
      const { data: list, error: listError } = await supabase.auth.admin.listUsers({
        page,
        perPage: 200,
      });
      if (listError || !list || list.users.length === 0) break;
      const match = list.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());
      if (match) {
        userId = match.id;
        break;
      }
      if (list.users.length < 200) break;
      page += 1;
    }

    if (userId) {
      const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
        password: ADMIN_PASSWORD,
        email_confirm: true,
      });
      if (updateError) {
        console.error("[ensure-admin] فشل تحديث كلمة سر المدير:", updateError.message);
      } else {
        console.log("[ensure-admin] تم مزامنة حساب المدير الحالي.");
      }
    }
  }

  if (!userId) {
    console.error("[ensure-admin] تعذّر تحديد حساب المدير.");
    return;
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .upsert({ id: userId, role: "admin", email: ADMIN_EMAIL, full_name: "مدير المتجر" });

  if (profileError) {
    console.error("[ensure-admin] فشل ضبط صلاحية المدير:", profileError.message);
    return;
  }

  console.log("[ensure-admin] حساب المدير جاهز بصلاحيات admin.");
}

main().catch((error) => {
  console.error("[ensure-admin] خطأ غير متوقع:", error);
});
