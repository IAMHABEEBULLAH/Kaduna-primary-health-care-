export type Language = 'en' | 'ha';

export interface NavItem {
  id: string;
  label: {
    en: string;
    ha: string;
  };
}

export interface Service {
  id: string;
  title: {
    en: string;
    ha: string;
  };
  description: {
    en: string;
    ha: string;
  };
  icon: string;
}

export interface Staff {
  id: string;
  name: string;
  role: {
    en: string;
    ha: string;
  };
  qualification: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: {
    en: string;
    ha: string;
  };
  excerpt: {
    en: string;
    ha: string;
  };
  date: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: {
    en: string;
    ha: string;
  };
  location: string;
}
