import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const GameRecordScalarFieldEnumSchema = z.enum(['id','userId','score']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','ip']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// GAME RECORD SCHEMA
/////////////////////////////////////////

export const GameRecordSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  score: z.number().int(),
})

export type GameRecord = z.infer<typeof GameRecordSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  ip: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// GAME RECORD
//------------------------------------------------------

export const GameRecordIncludeSchema: z.ZodType<Prisma.GameRecordInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const GameRecordArgsSchema: z.ZodType<Prisma.GameRecordDefaultArgs> = z.object({
  select: z.lazy(() => GameRecordSelectSchema).optional(),
  include: z.lazy(() => GameRecordIncludeSchema).optional(),
}).strict();

export const GameRecordSelectSchema: z.ZodType<Prisma.GameRecordSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  score: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  GameRecord: z.union([z.boolean(),z.lazy(() => GameRecordFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  GameRecord: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  ip: z.boolean().optional(),
  GameRecord: z.union([z.boolean(),z.lazy(() => GameRecordFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const GameRecordWhereInputSchema: z.ZodType<Prisma.GameRecordWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GameRecordWhereInputSchema),z.lazy(() => GameRecordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GameRecordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GameRecordWhereInputSchema),z.lazy(() => GameRecordWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  score: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const GameRecordOrderByWithRelationInputSchema: z.ZodType<Prisma.GameRecordOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const GameRecordWhereUniqueInputSchema: z.ZodType<Prisma.GameRecordWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => GameRecordWhereInputSchema),z.lazy(() => GameRecordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GameRecordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GameRecordWhereInputSchema),z.lazy(() => GameRecordWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  score: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const GameRecordOrderByWithAggregationInputSchema: z.ZodType<Prisma.GameRecordOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => GameRecordCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => GameRecordAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GameRecordMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GameRecordMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => GameRecordSumOrderByAggregateInputSchema).optional()
}).strict();

export const GameRecordScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GameRecordScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GameRecordScalarWhereWithAggregatesInputSchema),z.lazy(() => GameRecordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GameRecordScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GameRecordScalarWhereWithAggregatesInputSchema),z.lazy(() => GameRecordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  score: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ip: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  GameRecord: z.lazy(() => GameRecordListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  ip: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  GameRecord: z.lazy(() => GameRecordOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ip: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  GameRecord: z.lazy(() => GameRecordListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  ip: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ip: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const GameRecordCreateInputSchema: z.ZodType<Prisma.GameRecordCreateInput> = z.object({
  id: z.string().cuid().optional(),
  score: z.number().int(),
  user: z.lazy(() => UserCreateNestedOneWithoutGameRecordInputSchema)
}).strict();

export const GameRecordUncheckedCreateInputSchema: z.ZodType<Prisma.GameRecordUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  score: z.number().int()
}).strict();

export const GameRecordUpdateInputSchema: z.ZodType<Prisma.GameRecordUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutGameRecordNestedInputSchema).optional()
}).strict();

export const GameRecordUncheckedUpdateInputSchema: z.ZodType<Prisma.GameRecordUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GameRecordCreateManyInputSchema: z.ZodType<Prisma.GameRecordCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  score: z.number().int()
}).strict();

export const GameRecordUpdateManyMutationInputSchema: z.ZodType<Prisma.GameRecordUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GameRecordUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GameRecordUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  ip: z.string().optional().nullable(),
  GameRecord: z.lazy(() => GameRecordCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  ip: z.string().optional().nullable(),
  GameRecord: z.lazy(() => GameRecordUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  GameRecord: z.lazy(() => GameRecordUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  GameRecord: z.lazy(() => GameRecordUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  ip: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const GameRecordCountOrderByAggregateInputSchema: z.ZodType<Prisma.GameRecordCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameRecordAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GameRecordAvgOrderByAggregateInput> = z.object({
  score: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameRecordMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GameRecordMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameRecordMinOrderByAggregateInputSchema: z.ZodType<Prisma.GameRecordMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameRecordSumOrderByAggregateInputSchema: z.ZodType<Prisma.GameRecordSumOrderByAggregateInput> = z.object({
  score: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const GameRecordListRelationFilterSchema: z.ZodType<Prisma.GameRecordListRelationFilter> = z.object({
  every: z.lazy(() => GameRecordWhereInputSchema).optional(),
  some: z.lazy(() => GameRecordWhereInputSchema).optional(),
  none: z.lazy(() => GameRecordWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const GameRecordOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GameRecordOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  ip: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  ip: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  ip: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutGameRecordInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutGameRecordInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutGameRecordInputSchema),z.lazy(() => UserUncheckedCreateWithoutGameRecordInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGameRecordInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutGameRecordNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutGameRecordNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutGameRecordInputSchema),z.lazy(() => UserUncheckedCreateWithoutGameRecordInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGameRecordInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutGameRecordInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutGameRecordInputSchema),z.lazy(() => UserUpdateWithoutGameRecordInputSchema),z.lazy(() => UserUncheckedUpdateWithoutGameRecordInputSchema) ]).optional(),
}).strict();

export const GameRecordCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.GameRecordCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => GameRecordCreateWithoutUserInputSchema),z.lazy(() => GameRecordCreateWithoutUserInputSchema).array(),z.lazy(() => GameRecordUncheckedCreateWithoutUserInputSchema),z.lazy(() => GameRecordUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameRecordCreateOrConnectWithoutUserInputSchema),z.lazy(() => GameRecordCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GameRecordCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GameRecordWhereUniqueInputSchema),z.lazy(() => GameRecordWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameRecordUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.GameRecordUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => GameRecordCreateWithoutUserInputSchema),z.lazy(() => GameRecordCreateWithoutUserInputSchema).array(),z.lazy(() => GameRecordUncheckedCreateWithoutUserInputSchema),z.lazy(() => GameRecordUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameRecordCreateOrConnectWithoutUserInputSchema),z.lazy(() => GameRecordCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GameRecordCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GameRecordWhereUniqueInputSchema),z.lazy(() => GameRecordWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const GameRecordUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.GameRecordUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameRecordCreateWithoutUserInputSchema),z.lazy(() => GameRecordCreateWithoutUserInputSchema).array(),z.lazy(() => GameRecordUncheckedCreateWithoutUserInputSchema),z.lazy(() => GameRecordUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameRecordCreateOrConnectWithoutUserInputSchema),z.lazy(() => GameRecordCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameRecordUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => GameRecordUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GameRecordCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GameRecordWhereUniqueInputSchema),z.lazy(() => GameRecordWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameRecordWhereUniqueInputSchema),z.lazy(() => GameRecordWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameRecordWhereUniqueInputSchema),z.lazy(() => GameRecordWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameRecordWhereUniqueInputSchema),z.lazy(() => GameRecordWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameRecordUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => GameRecordUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameRecordUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => GameRecordUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameRecordScalarWhereInputSchema),z.lazy(() => GameRecordScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameRecordUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.GameRecordUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameRecordCreateWithoutUserInputSchema),z.lazy(() => GameRecordCreateWithoutUserInputSchema).array(),z.lazy(() => GameRecordUncheckedCreateWithoutUserInputSchema),z.lazy(() => GameRecordUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameRecordCreateOrConnectWithoutUserInputSchema),z.lazy(() => GameRecordCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameRecordUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => GameRecordUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GameRecordCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GameRecordWhereUniqueInputSchema),z.lazy(() => GameRecordWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameRecordWhereUniqueInputSchema),z.lazy(() => GameRecordWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameRecordWhereUniqueInputSchema),z.lazy(() => GameRecordWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameRecordWhereUniqueInputSchema),z.lazy(() => GameRecordWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameRecordUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => GameRecordUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameRecordUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => GameRecordUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameRecordScalarWhereInputSchema),z.lazy(() => GameRecordScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserCreateWithoutGameRecordInputSchema: z.ZodType<Prisma.UserCreateWithoutGameRecordInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  ip: z.string().optional().nullable()
}).strict();

export const UserUncheckedCreateWithoutGameRecordInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutGameRecordInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  ip: z.string().optional().nullable()
}).strict();

export const UserCreateOrConnectWithoutGameRecordInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutGameRecordInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutGameRecordInputSchema),z.lazy(() => UserUncheckedCreateWithoutGameRecordInputSchema) ]),
}).strict();

export const UserUpsertWithoutGameRecordInputSchema: z.ZodType<Prisma.UserUpsertWithoutGameRecordInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutGameRecordInputSchema),z.lazy(() => UserUncheckedUpdateWithoutGameRecordInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutGameRecordInputSchema),z.lazy(() => UserUncheckedCreateWithoutGameRecordInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutGameRecordInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGameRecordInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutGameRecordInputSchema),z.lazy(() => UserUncheckedUpdateWithoutGameRecordInputSchema) ]),
}).strict();

export const UserUpdateWithoutGameRecordInputSchema: z.ZodType<Prisma.UserUpdateWithoutGameRecordInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateWithoutGameRecordInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutGameRecordInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const GameRecordCreateWithoutUserInputSchema: z.ZodType<Prisma.GameRecordCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  score: z.number().int()
}).strict();

export const GameRecordUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.GameRecordUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  score: z.number().int()
}).strict();

export const GameRecordCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.GameRecordCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => GameRecordWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GameRecordCreateWithoutUserInputSchema),z.lazy(() => GameRecordUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const GameRecordCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.GameRecordCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => GameRecordCreateManyUserInputSchema),z.lazy(() => GameRecordCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const GameRecordUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.GameRecordUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => GameRecordWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GameRecordUpdateWithoutUserInputSchema),z.lazy(() => GameRecordUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => GameRecordCreateWithoutUserInputSchema),z.lazy(() => GameRecordUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const GameRecordUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.GameRecordUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => GameRecordWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GameRecordUpdateWithoutUserInputSchema),z.lazy(() => GameRecordUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const GameRecordUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.GameRecordUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => GameRecordScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GameRecordUpdateManyMutationInputSchema),z.lazy(() => GameRecordUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const GameRecordScalarWhereInputSchema: z.ZodType<Prisma.GameRecordScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GameRecordScalarWhereInputSchema),z.lazy(() => GameRecordScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GameRecordScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GameRecordScalarWhereInputSchema),z.lazy(() => GameRecordScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  score: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const GameRecordCreateManyUserInputSchema: z.ZodType<Prisma.GameRecordCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  score: z.number().int()
}).strict();

export const GameRecordUpdateWithoutUserInputSchema: z.ZodType<Prisma.GameRecordUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GameRecordUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.GameRecordUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GameRecordUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.GameRecordUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const GameRecordFindFirstArgsSchema: z.ZodType<Prisma.GameRecordFindFirstArgs> = z.object({
  select: GameRecordSelectSchema.optional(),
  include: GameRecordIncludeSchema.optional(),
  where: GameRecordWhereInputSchema.optional(),
  orderBy: z.union([ GameRecordOrderByWithRelationInputSchema.array(),GameRecordOrderByWithRelationInputSchema ]).optional(),
  cursor: GameRecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GameRecordScalarFieldEnumSchema,GameRecordScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const GameRecordFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GameRecordFindFirstOrThrowArgs> = z.object({
  select: GameRecordSelectSchema.optional(),
  include: GameRecordIncludeSchema.optional(),
  where: GameRecordWhereInputSchema.optional(),
  orderBy: z.union([ GameRecordOrderByWithRelationInputSchema.array(),GameRecordOrderByWithRelationInputSchema ]).optional(),
  cursor: GameRecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GameRecordScalarFieldEnumSchema,GameRecordScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const GameRecordFindManyArgsSchema: z.ZodType<Prisma.GameRecordFindManyArgs> = z.object({
  select: GameRecordSelectSchema.optional(),
  include: GameRecordIncludeSchema.optional(),
  where: GameRecordWhereInputSchema.optional(),
  orderBy: z.union([ GameRecordOrderByWithRelationInputSchema.array(),GameRecordOrderByWithRelationInputSchema ]).optional(),
  cursor: GameRecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GameRecordScalarFieldEnumSchema,GameRecordScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const GameRecordAggregateArgsSchema: z.ZodType<Prisma.GameRecordAggregateArgs> = z.object({
  where: GameRecordWhereInputSchema.optional(),
  orderBy: z.union([ GameRecordOrderByWithRelationInputSchema.array(),GameRecordOrderByWithRelationInputSchema ]).optional(),
  cursor: GameRecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const GameRecordGroupByArgsSchema: z.ZodType<Prisma.GameRecordGroupByArgs> = z.object({
  where: GameRecordWhereInputSchema.optional(),
  orderBy: z.union([ GameRecordOrderByWithAggregationInputSchema.array(),GameRecordOrderByWithAggregationInputSchema ]).optional(),
  by: GameRecordScalarFieldEnumSchema.array(),
  having: GameRecordScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const GameRecordFindUniqueArgsSchema: z.ZodType<Prisma.GameRecordFindUniqueArgs> = z.object({
  select: GameRecordSelectSchema.optional(),
  include: GameRecordIncludeSchema.optional(),
  where: GameRecordWhereUniqueInputSchema,
}).strict()

export const GameRecordFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GameRecordFindUniqueOrThrowArgs> = z.object({
  select: GameRecordSelectSchema.optional(),
  include: GameRecordIncludeSchema.optional(),
  where: GameRecordWhereUniqueInputSchema,
}).strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const GameRecordCreateArgsSchema: z.ZodType<Prisma.GameRecordCreateArgs> = z.object({
  select: GameRecordSelectSchema.optional(),
  include: GameRecordIncludeSchema.optional(),
  data: z.union([ GameRecordCreateInputSchema,GameRecordUncheckedCreateInputSchema ]),
}).strict()

export const GameRecordUpsertArgsSchema: z.ZodType<Prisma.GameRecordUpsertArgs> = z.object({
  select: GameRecordSelectSchema.optional(),
  include: GameRecordIncludeSchema.optional(),
  where: GameRecordWhereUniqueInputSchema,
  create: z.union([ GameRecordCreateInputSchema,GameRecordUncheckedCreateInputSchema ]),
  update: z.union([ GameRecordUpdateInputSchema,GameRecordUncheckedUpdateInputSchema ]),
}).strict()

export const GameRecordCreateManyArgsSchema: z.ZodType<Prisma.GameRecordCreateManyArgs> = z.object({
  data: z.union([ GameRecordCreateManyInputSchema,GameRecordCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const GameRecordDeleteArgsSchema: z.ZodType<Prisma.GameRecordDeleteArgs> = z.object({
  select: GameRecordSelectSchema.optional(),
  include: GameRecordIncludeSchema.optional(),
  where: GameRecordWhereUniqueInputSchema,
}).strict()

export const GameRecordUpdateArgsSchema: z.ZodType<Prisma.GameRecordUpdateArgs> = z.object({
  select: GameRecordSelectSchema.optional(),
  include: GameRecordIncludeSchema.optional(),
  data: z.union([ GameRecordUpdateInputSchema,GameRecordUncheckedUpdateInputSchema ]),
  where: GameRecordWhereUniqueInputSchema,
}).strict()

export const GameRecordUpdateManyArgsSchema: z.ZodType<Prisma.GameRecordUpdateManyArgs> = z.object({
  data: z.union([ GameRecordUpdateManyMutationInputSchema,GameRecordUncheckedUpdateManyInputSchema ]),
  where: GameRecordWhereInputSchema.optional(),
}).strict()

export const GameRecordDeleteManyArgsSchema: z.ZodType<Prisma.GameRecordDeleteManyArgs> = z.object({
  where: GameRecordWhereInputSchema.optional(),
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()