import { hasuraGraphqlClient } from "@/config-lib/hasura-graphql-client/hasura-graphql-client";

// 生成随机验证码
export function generateCode(length: number = 6): string {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

// 保存验证码
export async function saveCode(
  mobile: string,
  code: string,
  type: string,
  expiresAt: Date
): Promise<string | null> {
  const res = await hasuraGraphqlClient.insert_data_one<Partial<any>>({
    table: "verification_codes",
    args: {
      object: {
        mobile,
        code,
        type,
        expires_at: expiresAt.toISOString(),
        is_used: false,
      } as any,
    },
    data_fields: ["id"],
  });
  return res?.id ? String(res.id) : null;
}

// 校验验证码
export async function verifyCode(
  mobile: string,
  code: string,
  type: string
): Promise<boolean> {
  const now = new Date().toISOString();
  const verificationCode = await hasuraGraphqlClient.data<Partial<any>>({
    table: "verification_codes",
    args: {
      where: {
        mobile: { _eq: mobile },
        code: { _eq: code },
        type: { _eq: type },
        is_used: { _eq: false },
        expires_at: { _gt: now },
      },
      limit: 1,
    },
    data_fields: ["id"],
  });
  if (verificationCode && verificationCode.id) {
    // 标记为已用
    await hasuraGraphqlClient.update_data_by_pk<Partial<any>>({
      table: "verification_codes",
      args: {
        pk_columns: { id: verificationCode.id },
        _set: { is_used: true },
      },
      data_fields: ["id"],
    });
    return true;
  }
  return false;
} 