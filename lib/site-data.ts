const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta_label: string;
  cta_link: string;
  sort_order: number;
  is_active: boolean;
}

/**
 * Mengambil data Informasi Toko & Footer dari API Laravel
 */
export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${API_BASE_URL}/site-settings`, {
      cache: "no-store",
    });
    if (!res.ok) return {};
    return await res.json();
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return {};
  }
}

/**
 * Mengambil data Banner Carousel dari API Laravel
 */
export async function getBanners(): Promise<Banner[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/banners`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}
