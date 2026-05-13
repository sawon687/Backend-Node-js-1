import type { IncomingMessage, ServerResponse } from 'node:http';
export type Method="GET"|"PUT"|"PATCH"|"DELETE"|"POST"
export type Req=IncomingMessage  &{
    method:Method
};
export type Res=ServerResponse;