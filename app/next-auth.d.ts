import 'next-auth';

declare module 'next-auth' {
  interface Session {
    provider?: string;
  }
  interface AdapterUser {
    provider?: string;
  }
}
