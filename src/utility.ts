import type { Req, Res } from "./type/type";

export const sendResponse=<T>(
  res: Res,
  { message, data, error }: { message: string; data?: T; error?: boolean },
  status = 200,
)=> {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(
    JSON.stringify({
      success: error ? false : true,
      message: message,
      data: error ? null : data,
      status: status,
    }),
  );
}

export async function extraRequestInfo<T>(req: Req) {
  const url = req.url?? "/";
  const method = req.method;
  const params = req.url?.split("/").filter(Boolean)?? [];
  const body = method == "POST" || method === "PUT" || method === "PATCH"
      ? await parseBody<T>(req)
      : null;
  return {
    url,
    method,
    params,
    body
  };
}

const parseBody = async <T>(req: Req): Promise<T|null> => {
  return new Promise((resolve, rejects) => {
    let body = "";
    req.on("data", (chunk:string) => {
      body += chunk.toString()
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse( body));
      } catch (error) {
        rejects(new Error("invalid data"));
      }
    });
  });
};
