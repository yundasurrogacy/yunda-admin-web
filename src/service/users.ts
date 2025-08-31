import { hasuraGraphqlClient } from "@/config-lib/hasura-graphql-client/hasura-graphql-client";
import {
  Users_Insert_Input,
  Users,
  Users_On_Conflict,
  Users_Constraint,
  Users_Update_Column,
} from "@/types/graphql";

/**
 * 通过手机号自动注册或登录，返回用户表id
 * @param phone 手机号
 * @returns Promise<string | null> 用户id（bigint字符串），未注册且注册失败时返回null
 */
export async function getOrCreateUserIdByPhone(
  phone: string
): Promise<string | null> {
  if (!phone) return null;
  // 1. 查询用户是否已存在
  const user = await hasuraGraphqlClient.data<Partial<Users>>({
    table: "users",
    args: { where: { phone: { _eq: phone } } },
    data_fields: ["id"],
  });
  if (user && user.id) {
    return String(user.id);
  }
  // 2. 不存在则自动注册
  const newUser = await hasuraGraphqlClient.insert_data_one<Partial<Users>>({
    table: "users",
    args: {
      object: { phone } as Users_Insert_Input,
      on_conflict: {
        constraint: () => Users_Constraint.UsersPhoneKey,
        update_columns: () => [Users_Update_Column.Phone],
      },
    },
    data_fields: ["id"],
  });
  if (newUser && newUser.id) {
    return String(newUser.id);
  }
  return null;
}

/**
 * 判断用户是否为管理员
 * @param userId 用户id（bigint字符串）
 * @returns Promise<boolean> 是否为管理员
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  if (!userId) return false;
  const manager = await hasuraGraphqlClient.data({
    table: "managers",
    args: {
      where: {
        user_users: { _eq: userId },
        is_active: { _eq: true },
      },
      limit: 1,
    },
    data_fields: ["id"]
  });
  return !!(manager && manager.id);
}

/**
 * 通过手机号
 */