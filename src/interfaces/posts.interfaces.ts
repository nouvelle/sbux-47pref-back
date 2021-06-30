export interface PostsInterface {
  image?: string;
  comments?: string | null;
  author: string;
  secretkey?: string | null;
  snshandle?: string | null;
  tag?: string | null;
  pref_id?: number;
}

export interface SecretkeyInterface {
  key: string;
}
