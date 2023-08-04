export interface DataModel {
    title: string;
    description: string | null;
    from_hour?: string;
    to_hour?: string;
    images: string[] | null;
  }