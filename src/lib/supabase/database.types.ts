export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          slug: string;
          sort_order: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          slug: string;
          sort_order?: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          slug?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      coupons: {
        Row: {
          code: string;
          discount_percent: number;
          end_date: string | null;
          id: string;
          min_order: number;
          start_date: string | null;
          usage_limit: number | null;
          used_count: number;
        };
        Insert: {
          code: string;
          discount_percent: number;
          end_date?: string | null;
          id?: string;
          min_order?: number;
          start_date?: string | null;
          usage_limit?: number | null;
          used_count?: number;
        };
        Update: {
          code?: string;
          discount_percent?: number;
          end_date?: string | null;
          id?: string;
          min_order?: number;
          start_date?: string | null;
          usage_limit?: number | null;
          used_count?: number;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          color: string | null;
          id: string;
          order_id: string;
          price: number;
          product_id: string | null;
          product_name: string;
          qty: number;
          size: string | null;
        };
        Insert: {
          color?: string | null;
          id?: string;
          order_id: string;
          price: number;
          product_id?: string | null;
          product_name: string;
          qty?: number;
          size?: string | null;
        };
        Update: {
          color?: string | null;
          id?: string;
          order_id?: string;
          price?: number;
          product_id?: string | null;
          product_name?: string;
          qty?: number;
          size?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          address: string | null;
          city: string;
          created_at: string;
          customer_id: string | null;
          customer_name: string;
          delivery_fee: number;
          district: string | null;
          id: string;
          notes: string | null;
          order_number: string;
          payment_method: string;
          phone: string;
          status: string;
          subtotal: number;
          total: number;
        };
        Insert: {
          address?: string | null;
          city?: string;
          created_at?: string;
          customer_id?: string | null;
          customer_name: string;
          delivery_fee?: number;
          district?: string | null;
          id?: string;
          notes?: string | null;
          order_number: string;
          payment_method?: string;
          phone: string;
          status?: string;
          subtotal: number;
          total: number;
        };
        Update: {
          address?: string | null;
          city?: string;
          created_at?: string;
          customer_id?: string | null;
          customer_name?: string;
          delivery_fee?: number;
          district?: string | null;
          id?: string;
          notes?: string | null;
          order_number?: string;
          payment_method?: string;
          phone?: string;
          status?: string;
          subtotal?: number;
          total?: number;
        };
        Relationships: [];
      };
      products: {
        Row: {
          badge: string | null;
          category: string;
          colors: string[];
          created_at: string;
          description: string | null;
          id: string;
          images: string[];
          name: string;
          old_price: number | null;
          price: number;
          sizes: string[];
          sku: string | null;
          slug: string;
          status: string;
          stock: number;
        };
        Insert: {
          badge?: string | null;
          category: string;
          colors?: string[];
          created_at?: string;
          description?: string | null;
          id?: string;
          images?: string[];
          name: string;
          old_price?: number | null;
          price: number;
          sizes?: string[];
          sku?: string | null;
          slug: string;
          status?: string;
          stock?: number;
        };
        Update: {
          badge?: string | null;
          category?: string;
          colors?: string[];
          created_at?: string;
          description?: string | null;
          id?: string;
          images?: string[];
          name?: string;
          old_price?: number | null;
          price?: number;
          sizes?: string[];
          sku?: string | null;
          slug?: string;
          status?: string;
          stock?: number;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string | null;
          full_name: string | null;
          id: string;
          phone: string | null;
          role: string;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id: string;
          phone?: string | null;
          role?: string;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          phone?: string | null;
          role?: string;
        };
        Relationships: [];
      };
      store_settings: {
        Row: {
          banner_text: string | null;
          contact_phone: string | null;
          delivery_fee: number;
          id: boolean;
        };
        Insert: {
          banner_text?: string | null;
          contact_phone?: string | null;
          delivery_fee?: number;
          id?: boolean;
        };
        Update: {
          banner_text?: string | null;
          contact_phone?: string | null;
          delivery_fee?: number;
          id?: boolean;
        };
        Relationships: [];
      };
      wishlists: {
        Row: {
          created_at: string;
          customer_id: string;
          id: string;
          product_id: string;
        };
        Insert: {
          created_at?: string;
          customer_id: string;
          id?: string;
          product_id: string;
        };
        Update: {
          created_at?: string;
          customer_id?: string;
          id?: string;
          product_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "wishlists_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_order: {
        Args: {
          p_address: string;
          p_city: string;
          p_coupon_code: string;
          p_customer_name: string;
          p_district: string;
          p_items: Json;
          p_notes: string;
          p_phone: string;
        };
        Returns: Json;
      };
      is_admin: { Args: Record<string, never>; Returns: boolean };
      track_order: {
        Args: { p_order_number: string; p_phone: string };
        Returns: Json;
      };
      validate_coupon: {
        Args: { p_code: string; p_subtotal: number };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
