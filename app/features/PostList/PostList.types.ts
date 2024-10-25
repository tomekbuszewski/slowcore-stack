export interface PostPayload {
  name: string;
}

export interface Post {
  id: string | number;
  name: string;
}

export interface FormActionResponse {
  errors: Partial<PostPayload>;
  message: string;
  post?: Post;
  status: number;
}

export interface Props {
  actionData?: FormActionResponse;
  posts: Post[];
}
