export function getYouTubeEmbedUrl(url: string): string {
  const videoIdMatch = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  if (videoIdMatch && videoIdMatch[1]) {
    return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
  }
  return url;
}

export function formatWhatsAppMessage(data: {
  name: string;
  phone: string;
  category: string;
  description: string;
}): string {
  const categoryLabels: Record<string, string> = {
    video: "إنتاج فيديو",
    graphic: "تصميم جرافيكي",
    "music-video": "فيديو كليب",
    brand: "هوية بصرية",
    ad: "إعلان",
    other: "أخرى",
  };

  return encodeURIComponent(
    `طلب جديد من موقع هادي الفضيلي\n\n` +
      `الاسم: ${data.name}\n` +
      `رقم الهاتف: ${data.phone}\n` +
      `نوع الطلب: ${categoryLabels[data.category] || data.category}\n` +
      `وصف المشروع: ${data.description}`
  );
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}