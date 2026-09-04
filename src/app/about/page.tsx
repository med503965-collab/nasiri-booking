import { STORE } from "@/lib/store-config";

export const metadata = {
  title: "من نحن | AYOUNA — أيونا",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-display mb-6 text-3xl text-brown-900">من نحن</h1>
      <div className="flex flex-col gap-5 leading-relaxed text-brown-800">
        <p>
          {STORE.nameAr} ({STORE.name}) متجر إلكتروني مغربي متخصص في الملابس
          والمنتجات النسائية، انطلق من مدينة {STORE.city}، حيث تلتقي رمال
          الصحراء الذهبية بأمواج المحيط الأطلسي.
        </p>
        <p>
          شعارنا «{STORE.slogan}» يعبّر عن هويتنا: أناقة نسائية أصيلة، مستوحاة
          من ألوان الصحراء الدافئة ومن اللمسة المغربية العريقة، بروح عصرية
          فاخرة تليق بكل امرأة.
        </p>
        <p>
          نحرص على اختيار كل قطعة بعناية — من الفساتين والقفاطين إلى الحقائب
          والإكسسوارات — لتجمع بين الجودة والتصميم الأنيق والراحة في
          الاستخدام اليومي.
        </p>
        <p>
          نوفّر التوصيل داخل المغرب، والأسعار معروضة بالدرهم المغربي (MAD)،
          مع إمكانية إتمام الطلب بسهولة عبر واتساب.
        </p>
      </div>
    </div>
  );
}
