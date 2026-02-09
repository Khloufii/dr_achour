
export interface Service {
  id: string;
  title: string;
  description: string;
  details: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
}

export interface Tip {
  id: string;
  title: string;
  content: string;
  icon: string;
}
