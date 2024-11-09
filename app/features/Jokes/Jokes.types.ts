export interface JokePayload {
  punchline: string;
  setup: string;
}

export interface Joke {
  id: string | number;
  punchline: string;
  setup: string;
}

export interface FormActionResponse {
  errors: Partial<JokePayload>;
  message: string;
  joke?: Joke;
  status: number;
}

export interface Props {
  actionData?: FormActionResponse;
  jokes: Joke[];
}
