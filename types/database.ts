export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          avatar_url: string | null;
          role: "user" | "admin";
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          avatar_url?: string | null;
          role?: "user" | "admin";
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          avatar_url?: string | null;
          role?: "user" | "admin";
          created_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          slug: string;
          name_uk: string;
          icon: string | null;
          sort_order: number;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          slug: string;
          name_uk: string;
          icon?: string | null;
          sort_order?: number;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          slug?: string;
          name_uk?: string;
          icon?: string | null;
          sort_order?: number;
          is_active?: boolean;
        };
      };
      merchants: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          affiliate_base_url: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          logo_url?: string | null;
          affiliate_base_url?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          logo_url?: string | null;
          affiliate_base_url?: string | null;
        };
      };
      deals: {
        Row: {
          id: string;
          user_id: string;
          category_id: string;
          merchant_id: string;
          title: string;
          description: string;
          price_uah: number;
          original_price_uah: number | null;
          external_url: string;
          affiliate_url: string | null;
          image_url: string | null;
          status: "pending" | "approved" | "rejected" | "expired";
          hot_count: number;
          cold_count: number;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category_id: string;
          merchant_id: string;
          title: string;
          description: string;
          price_uah: number;
          original_price_uah?: number | null;
          external_url: string;
          affiliate_url?: string | null;
          image_url?: string | null;
          status?: "pending" | "approved" | "rejected" | "expired";
          hot_count?: number;
          cold_count?: number;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category_id?: string;
          merchant_id?: string;
          title?: string;
          description?: string;
          price_uah?: number;
          original_price_uah?: number | null;
          external_url?: string;
          affiliate_url?: string | null;
          image_url?: string | null;
          status?: "pending" | "approved" | "rejected" | "expired";
          hot_count?: number;
          cold_count?: number;
          expires_at?: string | null;
          created_at?: string;
        };
      };
      votes: {
        Row: {
          id: string;
          deal_id: string;
          user_id: string;
          vote_type: "hot" | "cold";
          created_at: string;
        };
        Insert: {
          id?: string;
          deal_id: string;
          user_id: string;
          vote_type: "hot" | "cold";
          created_at?: string;
        };
        Update: {
          id?: string;
          deal_id?: string;
          user_id?: string;
          vote_type?: "hot" | "cold";
          created_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          deal_id: string;
          user_id: string;
          body: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          deal_id: string;
          user_id: string;
          body: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          deal_id?: string;
          user_id?: string;
          body?: string;
          created_at?: string;
        };
      };
      click_events: {
        Row: {
          id: string;
          deal_id: string;
          user_id: string | null;
          clicked_at: string;
        };
        Insert: {
          id?: string;
          deal_id: string;
          user_id?: string | null;
          clicked_at?: string;
        };
        Update: {
          id?: string;
          deal_id?: string;
          user_id?: string | null;
          clicked_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: Record<string, never>;
  };
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Merchant = Database["public"]["Tables"]["merchants"]["Row"];
export type Deal = Database["public"]["Tables"]["deals"]["Row"];
export type Vote = Database["public"]["Tables"]["votes"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];

export type DealWithRelations = Deal & {
  category: Pick<Category, "slug" | "name_uk" | "icon"> | null;
  merchant: Pick<Merchant, "name" | "slug" | "logo_url"> | null;
  profile: Pick<Profile, "username" | "avatar_url"> | null;
};

export type CommentWithProfile = Comment & {
  profile: Pick<Profile, "username" | "avatar_url"> | null;
};

export type SortMode = "hot" | "new" | "top" | "commented";
