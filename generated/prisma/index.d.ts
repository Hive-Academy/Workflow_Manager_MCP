
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model TaskDescription
 * 
 */
export type TaskDescription = $Result.DefaultSelection<Prisma.$TaskDescriptionPayload>
/**
 * Model ImplementationPlan
 * 
 */
export type ImplementationPlan = $Result.DefaultSelection<Prisma.$ImplementationPlanPayload>
/**
 * Model Subtask
 * 
 */
export type Subtask = $Result.DefaultSelection<Prisma.$SubtaskPayload>
/**
 * Model DelegationRecord
 * 
 */
export type DelegationRecord = $Result.DefaultSelection<Prisma.$DelegationRecordPayload>
/**
 * Model ResearchReport
 * 
 */
export type ResearchReport = $Result.DefaultSelection<Prisma.$ResearchReportPayload>
/**
 * Model CodeReview
 * 
 */
export type CodeReview = $Result.DefaultSelection<Prisma.$CodeReviewPayload>
/**
 * Model CompletionReport
 * 
 */
export type CompletionReport = $Result.DefaultSelection<Prisma.$CompletionReportPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model WorkflowTransition
 * 
 */
export type WorkflowTransition = $Result.DefaultSelection<Prisma.$WorkflowTransitionPayload>
/**
 * Model CodebaseAnalysis
 * 
 */
export type CodebaseAnalysis = $Result.DefaultSelection<Prisma.$CodebaseAnalysisPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tasks
 * const tasks = await prisma.task.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tasks
   * const tasks = await prisma.task.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taskDescription`: Exposes CRUD operations for the **TaskDescription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskDescriptions
    * const taskDescriptions = await prisma.taskDescription.findMany()
    * ```
    */
  get taskDescription(): Prisma.TaskDescriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.implementationPlan`: Exposes CRUD operations for the **ImplementationPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ImplementationPlans
    * const implementationPlans = await prisma.implementationPlan.findMany()
    * ```
    */
  get implementationPlan(): Prisma.ImplementationPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subtask`: Exposes CRUD operations for the **Subtask** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subtasks
    * const subtasks = await prisma.subtask.findMany()
    * ```
    */
  get subtask(): Prisma.SubtaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.delegationRecord`: Exposes CRUD operations for the **DelegationRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DelegationRecords
    * const delegationRecords = await prisma.delegationRecord.findMany()
    * ```
    */
  get delegationRecord(): Prisma.DelegationRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.researchReport`: Exposes CRUD operations for the **ResearchReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResearchReports
    * const researchReports = await prisma.researchReport.findMany()
    * ```
    */
  get researchReport(): Prisma.ResearchReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.codeReview`: Exposes CRUD operations for the **CodeReview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CodeReviews
    * const codeReviews = await prisma.codeReview.findMany()
    * ```
    */
  get codeReview(): Prisma.CodeReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.completionReport`: Exposes CRUD operations for the **CompletionReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompletionReports
    * const completionReports = await prisma.completionReport.findMany()
    * ```
    */
  get completionReport(): Prisma.CompletionReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workflowTransition`: Exposes CRUD operations for the **WorkflowTransition** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkflowTransitions
    * const workflowTransitions = await prisma.workflowTransition.findMany()
    * ```
    */
  get workflowTransition(): Prisma.WorkflowTransitionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.codebaseAnalysis`: Exposes CRUD operations for the **CodebaseAnalysis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CodebaseAnalyses
    * const codebaseAnalyses = await prisma.codebaseAnalysis.findMany()
    * ```
    */
  get codebaseAnalysis(): Prisma.CodebaseAnalysisDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Task: 'Task',
    TaskDescription: 'TaskDescription',
    ImplementationPlan: 'ImplementationPlan',
    Subtask: 'Subtask',
    DelegationRecord: 'DelegationRecord',
    ResearchReport: 'ResearchReport',
    CodeReview: 'CodeReview',
    CompletionReport: 'CompletionReport',
    Comment: 'Comment',
    WorkflowTransition: 'WorkflowTransition',
    CodebaseAnalysis: 'CodebaseAnalysis'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "task" | "taskDescription" | "implementationPlan" | "subtask" | "delegationRecord" | "researchReport" | "codeReview" | "completionReport" | "comment" | "workflowTransition" | "codebaseAnalysis"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      TaskDescription: {
        payload: Prisma.$TaskDescriptionPayload<ExtArgs>
        fields: Prisma.TaskDescriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskDescriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskDescriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskDescriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskDescriptionPayload>
          }
          findFirst: {
            args: Prisma.TaskDescriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskDescriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskDescriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskDescriptionPayload>
          }
          findMany: {
            args: Prisma.TaskDescriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskDescriptionPayload>[]
          }
          create: {
            args: Prisma.TaskDescriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskDescriptionPayload>
          }
          createMany: {
            args: Prisma.TaskDescriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskDescriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskDescriptionPayload>[]
          }
          delete: {
            args: Prisma.TaskDescriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskDescriptionPayload>
          }
          update: {
            args: Prisma.TaskDescriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskDescriptionPayload>
          }
          deleteMany: {
            args: Prisma.TaskDescriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskDescriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskDescriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskDescriptionPayload>[]
          }
          upsert: {
            args: Prisma.TaskDescriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskDescriptionPayload>
          }
          aggregate: {
            args: Prisma.TaskDescriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskDescription>
          }
          groupBy: {
            args: Prisma.TaskDescriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskDescriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskDescriptionCountArgs<ExtArgs>
            result: $Utils.Optional<TaskDescriptionCountAggregateOutputType> | number
          }
        }
      }
      ImplementationPlan: {
        payload: Prisma.$ImplementationPlanPayload<ExtArgs>
        fields: Prisma.ImplementationPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImplementationPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementationPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImplementationPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementationPlanPayload>
          }
          findFirst: {
            args: Prisma.ImplementationPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementationPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImplementationPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementationPlanPayload>
          }
          findMany: {
            args: Prisma.ImplementationPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementationPlanPayload>[]
          }
          create: {
            args: Prisma.ImplementationPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementationPlanPayload>
          }
          createMany: {
            args: Prisma.ImplementationPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImplementationPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementationPlanPayload>[]
          }
          delete: {
            args: Prisma.ImplementationPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementationPlanPayload>
          }
          update: {
            args: Prisma.ImplementationPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementationPlanPayload>
          }
          deleteMany: {
            args: Prisma.ImplementationPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImplementationPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ImplementationPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementationPlanPayload>[]
          }
          upsert: {
            args: Prisma.ImplementationPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImplementationPlanPayload>
          }
          aggregate: {
            args: Prisma.ImplementationPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImplementationPlan>
          }
          groupBy: {
            args: Prisma.ImplementationPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImplementationPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImplementationPlanCountArgs<ExtArgs>
            result: $Utils.Optional<ImplementationPlanCountAggregateOutputType> | number
          }
        }
      }
      Subtask: {
        payload: Prisma.$SubtaskPayload<ExtArgs>
        fields: Prisma.SubtaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubtaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubtaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          findFirst: {
            args: Prisma.SubtaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubtaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          findMany: {
            args: Prisma.SubtaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>[]
          }
          create: {
            args: Prisma.SubtaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          createMany: {
            args: Prisma.SubtaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubtaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>[]
          }
          delete: {
            args: Prisma.SubtaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          update: {
            args: Prisma.SubtaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          deleteMany: {
            args: Prisma.SubtaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubtaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubtaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>[]
          }
          upsert: {
            args: Prisma.SubtaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          aggregate: {
            args: Prisma.SubtaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubtask>
          }
          groupBy: {
            args: Prisma.SubtaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubtaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubtaskCountArgs<ExtArgs>
            result: $Utils.Optional<SubtaskCountAggregateOutputType> | number
          }
        }
      }
      DelegationRecord: {
        payload: Prisma.$DelegationRecordPayload<ExtArgs>
        fields: Prisma.DelegationRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DelegationRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DelegationRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationRecordPayload>
          }
          findFirst: {
            args: Prisma.DelegationRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DelegationRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationRecordPayload>
          }
          findMany: {
            args: Prisma.DelegationRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationRecordPayload>[]
          }
          create: {
            args: Prisma.DelegationRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationRecordPayload>
          }
          createMany: {
            args: Prisma.DelegationRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DelegationRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationRecordPayload>[]
          }
          delete: {
            args: Prisma.DelegationRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationRecordPayload>
          }
          update: {
            args: Prisma.DelegationRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationRecordPayload>
          }
          deleteMany: {
            args: Prisma.DelegationRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DelegationRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DelegationRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationRecordPayload>[]
          }
          upsert: {
            args: Prisma.DelegationRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationRecordPayload>
          }
          aggregate: {
            args: Prisma.DelegationRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDelegationRecord>
          }
          groupBy: {
            args: Prisma.DelegationRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<DelegationRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.DelegationRecordCountArgs<ExtArgs>
            result: $Utils.Optional<DelegationRecordCountAggregateOutputType> | number
          }
        }
      }
      ResearchReport: {
        payload: Prisma.$ResearchReportPayload<ExtArgs>
        fields: Prisma.ResearchReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResearchReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResearchReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchReportPayload>
          }
          findFirst: {
            args: Prisma.ResearchReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResearchReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchReportPayload>
          }
          findMany: {
            args: Prisma.ResearchReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchReportPayload>[]
          }
          create: {
            args: Prisma.ResearchReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchReportPayload>
          }
          createMany: {
            args: Prisma.ResearchReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResearchReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchReportPayload>[]
          }
          delete: {
            args: Prisma.ResearchReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchReportPayload>
          }
          update: {
            args: Prisma.ResearchReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchReportPayload>
          }
          deleteMany: {
            args: Prisma.ResearchReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResearchReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResearchReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchReportPayload>[]
          }
          upsert: {
            args: Prisma.ResearchReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchReportPayload>
          }
          aggregate: {
            args: Prisma.ResearchReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResearchReport>
          }
          groupBy: {
            args: Prisma.ResearchReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResearchReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResearchReportCountArgs<ExtArgs>
            result: $Utils.Optional<ResearchReportCountAggregateOutputType> | number
          }
        }
      }
      CodeReview: {
        payload: Prisma.$CodeReviewPayload<ExtArgs>
        fields: Prisma.CodeReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CodeReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CodeReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeReviewPayload>
          }
          findFirst: {
            args: Prisma.CodeReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CodeReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeReviewPayload>
          }
          findMany: {
            args: Prisma.CodeReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeReviewPayload>[]
          }
          create: {
            args: Prisma.CodeReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeReviewPayload>
          }
          createMany: {
            args: Prisma.CodeReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CodeReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeReviewPayload>[]
          }
          delete: {
            args: Prisma.CodeReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeReviewPayload>
          }
          update: {
            args: Prisma.CodeReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeReviewPayload>
          }
          deleteMany: {
            args: Prisma.CodeReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CodeReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CodeReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeReviewPayload>[]
          }
          upsert: {
            args: Prisma.CodeReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodeReviewPayload>
          }
          aggregate: {
            args: Prisma.CodeReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCodeReview>
          }
          groupBy: {
            args: Prisma.CodeReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<CodeReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.CodeReviewCountArgs<ExtArgs>
            result: $Utils.Optional<CodeReviewCountAggregateOutputType> | number
          }
        }
      }
      CompletionReport: {
        payload: Prisma.$CompletionReportPayload<ExtArgs>
        fields: Prisma.CompletionReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompletionReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletionReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompletionReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletionReportPayload>
          }
          findFirst: {
            args: Prisma.CompletionReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletionReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompletionReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletionReportPayload>
          }
          findMany: {
            args: Prisma.CompletionReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletionReportPayload>[]
          }
          create: {
            args: Prisma.CompletionReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletionReportPayload>
          }
          createMany: {
            args: Prisma.CompletionReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompletionReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletionReportPayload>[]
          }
          delete: {
            args: Prisma.CompletionReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletionReportPayload>
          }
          update: {
            args: Prisma.CompletionReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletionReportPayload>
          }
          deleteMany: {
            args: Prisma.CompletionReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompletionReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompletionReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletionReportPayload>[]
          }
          upsert: {
            args: Prisma.CompletionReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompletionReportPayload>
          }
          aggregate: {
            args: Prisma.CompletionReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompletionReport>
          }
          groupBy: {
            args: Prisma.CompletionReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompletionReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompletionReportCountArgs<ExtArgs>
            result: $Utils.Optional<CompletionReportCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      WorkflowTransition: {
        payload: Prisma.$WorkflowTransitionPayload<ExtArgs>
        fields: Prisma.WorkflowTransitionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowTransitionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowTransitionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>
          }
          findFirst: {
            args: Prisma.WorkflowTransitionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowTransitionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>
          }
          findMany: {
            args: Prisma.WorkflowTransitionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>[]
          }
          create: {
            args: Prisma.WorkflowTransitionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>
          }
          createMany: {
            args: Prisma.WorkflowTransitionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowTransitionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>[]
          }
          delete: {
            args: Prisma.WorkflowTransitionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>
          }
          update: {
            args: Prisma.WorkflowTransitionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>
          }
          deleteMany: {
            args: Prisma.WorkflowTransitionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowTransitionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkflowTransitionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>[]
          }
          upsert: {
            args: Prisma.WorkflowTransitionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTransitionPayload>
          }
          aggregate: {
            args: Prisma.WorkflowTransitionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflowTransition>
          }
          groupBy: {
            args: Prisma.WorkflowTransitionGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowTransitionGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowTransitionCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowTransitionCountAggregateOutputType> | number
          }
        }
      }
      CodebaseAnalysis: {
        payload: Prisma.$CodebaseAnalysisPayload<ExtArgs>
        fields: Prisma.CodebaseAnalysisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CodebaseAnalysisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodebaseAnalysisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CodebaseAnalysisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodebaseAnalysisPayload>
          }
          findFirst: {
            args: Prisma.CodebaseAnalysisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodebaseAnalysisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CodebaseAnalysisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodebaseAnalysisPayload>
          }
          findMany: {
            args: Prisma.CodebaseAnalysisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodebaseAnalysisPayload>[]
          }
          create: {
            args: Prisma.CodebaseAnalysisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodebaseAnalysisPayload>
          }
          createMany: {
            args: Prisma.CodebaseAnalysisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CodebaseAnalysisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodebaseAnalysisPayload>[]
          }
          delete: {
            args: Prisma.CodebaseAnalysisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodebaseAnalysisPayload>
          }
          update: {
            args: Prisma.CodebaseAnalysisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodebaseAnalysisPayload>
          }
          deleteMany: {
            args: Prisma.CodebaseAnalysisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CodebaseAnalysisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CodebaseAnalysisUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodebaseAnalysisPayload>[]
          }
          upsert: {
            args: Prisma.CodebaseAnalysisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CodebaseAnalysisPayload>
          }
          aggregate: {
            args: Prisma.CodebaseAnalysisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCodebaseAnalysis>
          }
          groupBy: {
            args: Prisma.CodebaseAnalysisGroupByArgs<ExtArgs>
            result: $Utils.Optional<CodebaseAnalysisGroupByOutputType>[]
          }
          count: {
            args: Prisma.CodebaseAnalysisCountArgs<ExtArgs>
            result: $Utils.Optional<CodebaseAnalysisCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    task?: TaskOmit
    taskDescription?: TaskDescriptionOmit
    implementationPlan?: ImplementationPlanOmit
    subtask?: SubtaskOmit
    delegationRecord?: DelegationRecordOmit
    researchReport?: ResearchReportOmit
    codeReview?: CodeReviewOmit
    completionReport?: CompletionReportOmit
    comment?: CommentOmit
    workflowTransition?: WorkflowTransitionOmit
    codebaseAnalysis?: CodebaseAnalysisOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    implementationPlans: number
    subtasks: number
    delegationRecords: number
    researchReports: number
    codeReviews: number
    completionReports: number
    comments: number
    workflowTransitions: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    implementationPlans?: boolean | TaskCountOutputTypeCountImplementationPlansArgs
    subtasks?: boolean | TaskCountOutputTypeCountSubtasksArgs
    delegationRecords?: boolean | TaskCountOutputTypeCountDelegationRecordsArgs
    researchReports?: boolean | TaskCountOutputTypeCountResearchReportsArgs
    codeReviews?: boolean | TaskCountOutputTypeCountCodeReviewsArgs
    completionReports?: boolean | TaskCountOutputTypeCountCompletionReportsArgs
    comments?: boolean | TaskCountOutputTypeCountCommentsArgs
    workflowTransitions?: boolean | TaskCountOutputTypeCountWorkflowTransitionsArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountImplementationPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImplementationPlanWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountSubtasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubtaskWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountDelegationRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DelegationRecordWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountResearchReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResearchReportWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountCodeReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CodeReviewWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountCompletionReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompletionReportWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountWorkflowTransitionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowTransitionWhereInput
  }


  /**
   * Count Type ImplementationPlanCountOutputType
   */

  export type ImplementationPlanCountOutputType = {
    subtasks: number
  }

  export type ImplementationPlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subtasks?: boolean | ImplementationPlanCountOutputTypeCountSubtasksArgs
  }

  // Custom InputTypes
  /**
   * ImplementationPlanCountOutputType without action
   */
  export type ImplementationPlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImplementationPlanCountOutputType
     */
    select?: ImplementationPlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ImplementationPlanCountOutputType without action
   */
  export type ImplementationPlanCountOutputTypeCountSubtasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubtaskWhereInput
  }


  /**
   * Count Type SubtaskCountOutputType
   */

  export type SubtaskCountOutputType = {
    delegationRecords: number
    comments: number
  }

  export type SubtaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    delegationRecords?: boolean | SubtaskCountOutputTypeCountDelegationRecordsArgs
    comments?: boolean | SubtaskCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * SubtaskCountOutputType without action
   */
  export type SubtaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubtaskCountOutputType
     */
    select?: SubtaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubtaskCountOutputType without action
   */
  export type SubtaskCountOutputTypeCountDelegationRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DelegationRecordWhereInput
  }

  /**
   * SubtaskCountOutputType without action
   */
  export type SubtaskCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    redelegationCount: number | null
  }

  export type TaskSumAggregateOutputType = {
    redelegationCount: number | null
  }

  export type TaskMinAggregateOutputType = {
    taskId: string | null
    name: string | null
    status: string | null
    creationDate: Date | null
    completionDate: Date | null
    owner: string | null
    currentMode: string | null
    priority: string | null
    redelegationCount: number | null
    gitBranch: string | null
  }

  export type TaskMaxAggregateOutputType = {
    taskId: string | null
    name: string | null
    status: string | null
    creationDate: Date | null
    completionDate: Date | null
    owner: string | null
    currentMode: string | null
    priority: string | null
    redelegationCount: number | null
    gitBranch: string | null
  }

  export type TaskCountAggregateOutputType = {
    taskId: number
    name: number
    status: number
    creationDate: number
    completionDate: number
    owner: number
    currentMode: number
    priority: number
    dependencies: number
    redelegationCount: number
    gitBranch: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    redelegationCount?: true
  }

  export type TaskSumAggregateInputType = {
    redelegationCount?: true
  }

  export type TaskMinAggregateInputType = {
    taskId?: true
    name?: true
    status?: true
    creationDate?: true
    completionDate?: true
    owner?: true
    currentMode?: true
    priority?: true
    redelegationCount?: true
    gitBranch?: true
  }

  export type TaskMaxAggregateInputType = {
    taskId?: true
    name?: true
    status?: true
    creationDate?: true
    completionDate?: true
    owner?: true
    currentMode?: true
    priority?: true
    redelegationCount?: true
    gitBranch?: true
  }

  export type TaskCountAggregateInputType = {
    taskId?: true
    name?: true
    status?: true
    creationDate?: true
    completionDate?: true
    owner?: true
    currentMode?: true
    priority?: true
    dependencies?: true
    redelegationCount?: true
    gitBranch?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    taskId: string
    name: string
    status: string
    creationDate: Date
    completionDate: Date | null
    owner: string | null
    currentMode: string | null
    priority: string | null
    dependencies: JsonValue | null
    redelegationCount: number
    gitBranch: string | null
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    taskId?: boolean
    name?: boolean
    status?: boolean
    creationDate?: boolean
    completionDate?: boolean
    owner?: boolean
    currentMode?: boolean
    priority?: boolean
    dependencies?: boolean
    redelegationCount?: boolean
    gitBranch?: boolean
    taskDescription?: boolean | Task$taskDescriptionArgs<ExtArgs>
    implementationPlans?: boolean | Task$implementationPlansArgs<ExtArgs>
    subtasks?: boolean | Task$subtasksArgs<ExtArgs>
    delegationRecords?: boolean | Task$delegationRecordsArgs<ExtArgs>
    researchReports?: boolean | Task$researchReportsArgs<ExtArgs>
    codeReviews?: boolean | Task$codeReviewsArgs<ExtArgs>
    completionReports?: boolean | Task$completionReportsArgs<ExtArgs>
    comments?: boolean | Task$commentsArgs<ExtArgs>
    workflowTransitions?: boolean | Task$workflowTransitionsArgs<ExtArgs>
    codebaseAnalysis?: boolean | Task$codebaseAnalysisArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    taskId?: boolean
    name?: boolean
    status?: boolean
    creationDate?: boolean
    completionDate?: boolean
    owner?: boolean
    currentMode?: boolean
    priority?: boolean
    dependencies?: boolean
    redelegationCount?: boolean
    gitBranch?: boolean
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    taskId?: boolean
    name?: boolean
    status?: boolean
    creationDate?: boolean
    completionDate?: boolean
    owner?: boolean
    currentMode?: boolean
    priority?: boolean
    dependencies?: boolean
    redelegationCount?: boolean
    gitBranch?: boolean
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    taskId?: boolean
    name?: boolean
    status?: boolean
    creationDate?: boolean
    completionDate?: boolean
    owner?: boolean
    currentMode?: boolean
    priority?: boolean
    dependencies?: boolean
    redelegationCount?: boolean
    gitBranch?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"taskId" | "name" | "status" | "creationDate" | "completionDate" | "owner" | "currentMode" | "priority" | "dependencies" | "redelegationCount" | "gitBranch", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    taskDescription?: boolean | Task$taskDescriptionArgs<ExtArgs>
    implementationPlans?: boolean | Task$implementationPlansArgs<ExtArgs>
    subtasks?: boolean | Task$subtasksArgs<ExtArgs>
    delegationRecords?: boolean | Task$delegationRecordsArgs<ExtArgs>
    researchReports?: boolean | Task$researchReportsArgs<ExtArgs>
    codeReviews?: boolean | Task$codeReviewsArgs<ExtArgs>
    completionReports?: boolean | Task$completionReportsArgs<ExtArgs>
    comments?: boolean | Task$commentsArgs<ExtArgs>
    workflowTransitions?: boolean | Task$workflowTransitionsArgs<ExtArgs>
    codebaseAnalysis?: boolean | Task$codebaseAnalysisArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      taskDescription: Prisma.$TaskDescriptionPayload<ExtArgs> | null
      implementationPlans: Prisma.$ImplementationPlanPayload<ExtArgs>[]
      subtasks: Prisma.$SubtaskPayload<ExtArgs>[]
      delegationRecords: Prisma.$DelegationRecordPayload<ExtArgs>[]
      researchReports: Prisma.$ResearchReportPayload<ExtArgs>[]
      codeReviews: Prisma.$CodeReviewPayload<ExtArgs>[]
      completionReports: Prisma.$CompletionReportPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      workflowTransitions: Prisma.$WorkflowTransitionPayload<ExtArgs>[]
      codebaseAnalysis: Prisma.$CodebaseAnalysisPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      taskId: string
      name: string
      status: string
      creationDate: Date
      completionDate: Date | null
      owner: string | null
      currentMode: string | null
      priority: string | null
      dependencies: Prisma.JsonValue | null
      redelegationCount: number
      gitBranch: string | null
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `taskId`
     * const taskWithTaskIdOnly = await prisma.task.findMany({ select: { taskId: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `taskId`
     * const taskWithTaskIdOnly = await prisma.task.createManyAndReturn({
     *   select: { taskId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `taskId`
     * const taskWithTaskIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { taskId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    taskDescription<T extends Task$taskDescriptionArgs<ExtArgs> = {}>(args?: Subset<T, Task$taskDescriptionArgs<ExtArgs>>): Prisma__TaskDescriptionClient<$Result.GetResult<Prisma.$TaskDescriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    implementationPlans<T extends Task$implementationPlansArgs<ExtArgs> = {}>(args?: Subset<T, Task$implementationPlansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImplementationPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subtasks<T extends Task$subtasksArgs<ExtArgs> = {}>(args?: Subset<T, Task$subtasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    delegationRecords<T extends Task$delegationRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Task$delegationRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegationRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    researchReports<T extends Task$researchReportsArgs<ExtArgs> = {}>(args?: Subset<T, Task$researchReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResearchReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    codeReviews<T extends Task$codeReviewsArgs<ExtArgs> = {}>(args?: Subset<T, Task$codeReviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodeReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    completionReports<T extends Task$completionReportsArgs<ExtArgs> = {}>(args?: Subset<T, Task$completionReportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompletionReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends Task$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Task$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workflowTransitions<T extends Task$workflowTransitionsArgs<ExtArgs> = {}>(args?: Subset<T, Task$workflowTransitionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowTransitionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    codebaseAnalysis<T extends Task$codebaseAnalysisArgs<ExtArgs> = {}>(args?: Subset<T, Task$codebaseAnalysisArgs<ExtArgs>>): Prisma__CodebaseAnalysisClient<$Result.GetResult<Prisma.$CodebaseAnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly taskId: FieldRef<"Task", 'String'>
    readonly name: FieldRef<"Task", 'String'>
    readonly status: FieldRef<"Task", 'String'>
    readonly creationDate: FieldRef<"Task", 'DateTime'>
    readonly completionDate: FieldRef<"Task", 'DateTime'>
    readonly owner: FieldRef<"Task", 'String'>
    readonly currentMode: FieldRef<"Task", 'String'>
    readonly priority: FieldRef<"Task", 'String'>
    readonly dependencies: FieldRef<"Task", 'Json'>
    readonly redelegationCount: FieldRef<"Task", 'Int'>
    readonly gitBranch: FieldRef<"Task", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.taskDescription
   */
  export type Task$taskDescriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskDescription
     */
    select?: TaskDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskDescription
     */
    omit?: TaskDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskDescriptionInclude<ExtArgs> | null
    where?: TaskDescriptionWhereInput
  }

  /**
   * Task.implementationPlans
   */
  export type Task$implementationPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImplementationPlan
     */
    select?: ImplementationPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImplementationPlan
     */
    omit?: ImplementationPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementationPlanInclude<ExtArgs> | null
    where?: ImplementationPlanWhereInput
    orderBy?: ImplementationPlanOrderByWithRelationInput | ImplementationPlanOrderByWithRelationInput[]
    cursor?: ImplementationPlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImplementationPlanScalarFieldEnum | ImplementationPlanScalarFieldEnum[]
  }

  /**
   * Task.subtasks
   */
  export type Task$subtasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    where?: SubtaskWhereInput
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    cursor?: SubtaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[]
  }

  /**
   * Task.delegationRecords
   */
  export type Task$delegationRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationRecord
     */
    select?: DelegationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegationRecord
     */
    omit?: DelegationRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationRecordInclude<ExtArgs> | null
    where?: DelegationRecordWhereInput
    orderBy?: DelegationRecordOrderByWithRelationInput | DelegationRecordOrderByWithRelationInput[]
    cursor?: DelegationRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DelegationRecordScalarFieldEnum | DelegationRecordScalarFieldEnum[]
  }

  /**
   * Task.researchReports
   */
  export type Task$researchReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchReport
     */
    select?: ResearchReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchReport
     */
    omit?: ResearchReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchReportInclude<ExtArgs> | null
    where?: ResearchReportWhereInput
    orderBy?: ResearchReportOrderByWithRelationInput | ResearchReportOrderByWithRelationInput[]
    cursor?: ResearchReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResearchReportScalarFieldEnum | ResearchReportScalarFieldEnum[]
  }

  /**
   * Task.codeReviews
   */
  export type Task$codeReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeReview
     */
    select?: CodeReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeReview
     */
    omit?: CodeReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeReviewInclude<ExtArgs> | null
    where?: CodeReviewWhereInput
    orderBy?: CodeReviewOrderByWithRelationInput | CodeReviewOrderByWithRelationInput[]
    cursor?: CodeReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CodeReviewScalarFieldEnum | CodeReviewScalarFieldEnum[]
  }

  /**
   * Task.completionReports
   */
  export type Task$completionReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletionReport
     */
    select?: CompletionReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompletionReport
     */
    omit?: CompletionReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletionReportInclude<ExtArgs> | null
    where?: CompletionReportWhereInput
    orderBy?: CompletionReportOrderByWithRelationInput | CompletionReportOrderByWithRelationInput[]
    cursor?: CompletionReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompletionReportScalarFieldEnum | CompletionReportScalarFieldEnum[]
  }

  /**
   * Task.comments
   */
  export type Task$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Task.workflowTransitions
   */
  export type Task$workflowTransitionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTransition
     */
    select?: WorkflowTransitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTransition
     */
    omit?: WorkflowTransitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowTransitionInclude<ExtArgs> | null
    where?: WorkflowTransitionWhereInput
    orderBy?: WorkflowTransitionOrderByWithRelationInput | WorkflowTransitionOrderByWithRelationInput[]
    cursor?: WorkflowTransitionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowTransitionScalarFieldEnum | WorkflowTransitionScalarFieldEnum[]
  }

  /**
   * Task.codebaseAnalysis
   */
  export type Task$codebaseAnalysisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodebaseAnalysis
     */
    select?: CodebaseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodebaseAnalysis
     */
    omit?: CodebaseAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodebaseAnalysisInclude<ExtArgs> | null
    where?: CodebaseAnalysisWhereInput
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model TaskDescription
   */

  export type AggregateTaskDescription = {
    _count: TaskDescriptionCountAggregateOutputType | null
    _min: TaskDescriptionMinAggregateOutputType | null
    _max: TaskDescriptionMaxAggregateOutputType | null
  }

  export type TaskDescriptionMinAggregateOutputType = {
    taskId: string | null
    description: string | null
    businessRequirements: string | null
    technicalRequirements: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskDescriptionMaxAggregateOutputType = {
    taskId: string | null
    description: string | null
    businessRequirements: string | null
    technicalRequirements: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskDescriptionCountAggregateOutputType = {
    taskId: number
    description: number
    businessRequirements: number
    technicalRequirements: number
    acceptanceCriteria: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskDescriptionMinAggregateInputType = {
    taskId?: true
    description?: true
    businessRequirements?: true
    technicalRequirements?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskDescriptionMaxAggregateInputType = {
    taskId?: true
    description?: true
    businessRequirements?: true
    technicalRequirements?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskDescriptionCountAggregateInputType = {
    taskId?: true
    description?: true
    businessRequirements?: true
    technicalRequirements?: true
    acceptanceCriteria?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskDescriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskDescription to aggregate.
     */
    where?: TaskDescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskDescriptions to fetch.
     */
    orderBy?: TaskDescriptionOrderByWithRelationInput | TaskDescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskDescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskDescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskDescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskDescriptions
    **/
    _count?: true | TaskDescriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskDescriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskDescriptionMaxAggregateInputType
  }

  export type GetTaskDescriptionAggregateType<T extends TaskDescriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskDescription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskDescription[P]>
      : GetScalarType<T[P], AggregateTaskDescription[P]>
  }




  export type TaskDescriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskDescriptionWhereInput
    orderBy?: TaskDescriptionOrderByWithAggregationInput | TaskDescriptionOrderByWithAggregationInput[]
    by: TaskDescriptionScalarFieldEnum[] | TaskDescriptionScalarFieldEnum
    having?: TaskDescriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskDescriptionCountAggregateInputType | true
    _min?: TaskDescriptionMinAggregateInputType
    _max?: TaskDescriptionMaxAggregateInputType
  }

  export type TaskDescriptionGroupByOutputType = {
    taskId: string
    description: string
    businessRequirements: string
    technicalRequirements: string
    acceptanceCriteria: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: TaskDescriptionCountAggregateOutputType | null
    _min: TaskDescriptionMinAggregateOutputType | null
    _max: TaskDescriptionMaxAggregateOutputType | null
  }

  type GetTaskDescriptionGroupByPayload<T extends TaskDescriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskDescriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskDescriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskDescriptionGroupByOutputType[P]>
            : GetScalarType<T[P], TaskDescriptionGroupByOutputType[P]>
        }
      >
    >


  export type TaskDescriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    taskId?: boolean
    description?: boolean
    businessRequirements?: boolean
    technicalRequirements?: boolean
    acceptanceCriteria?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskDescription"]>

  export type TaskDescriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    taskId?: boolean
    description?: boolean
    businessRequirements?: boolean
    technicalRequirements?: boolean
    acceptanceCriteria?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskDescription"]>

  export type TaskDescriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    taskId?: boolean
    description?: boolean
    businessRequirements?: boolean
    technicalRequirements?: boolean
    acceptanceCriteria?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskDescription"]>

  export type TaskDescriptionSelectScalar = {
    taskId?: boolean
    description?: boolean
    businessRequirements?: boolean
    technicalRequirements?: boolean
    acceptanceCriteria?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskDescriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"taskId" | "description" | "businessRequirements" | "technicalRequirements" | "acceptanceCriteria" | "createdAt" | "updatedAt", ExtArgs["result"]["taskDescription"]>
  export type TaskDescriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type TaskDescriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type TaskDescriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }

  export type $TaskDescriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskDescription"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      taskId: string
      description: string
      businessRequirements: string
      technicalRequirements: string
      acceptanceCriteria: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["taskDescription"]>
    composites: {}
  }

  type TaskDescriptionGetPayload<S extends boolean | null | undefined | TaskDescriptionDefaultArgs> = $Result.GetResult<Prisma.$TaskDescriptionPayload, S>

  type TaskDescriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskDescriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskDescriptionCountAggregateInputType | true
    }

  export interface TaskDescriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskDescription'], meta: { name: 'TaskDescription' } }
    /**
     * Find zero or one TaskDescription that matches the filter.
     * @param {TaskDescriptionFindUniqueArgs} args - Arguments to find a TaskDescription
     * @example
     * // Get one TaskDescription
     * const taskDescription = await prisma.taskDescription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskDescriptionFindUniqueArgs>(args: SelectSubset<T, TaskDescriptionFindUniqueArgs<ExtArgs>>): Prisma__TaskDescriptionClient<$Result.GetResult<Prisma.$TaskDescriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaskDescription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskDescriptionFindUniqueOrThrowArgs} args - Arguments to find a TaskDescription
     * @example
     * // Get one TaskDescription
     * const taskDescription = await prisma.taskDescription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskDescriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskDescriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskDescriptionClient<$Result.GetResult<Prisma.$TaskDescriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskDescription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskDescriptionFindFirstArgs} args - Arguments to find a TaskDescription
     * @example
     * // Get one TaskDescription
     * const taskDescription = await prisma.taskDescription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskDescriptionFindFirstArgs>(args?: SelectSubset<T, TaskDescriptionFindFirstArgs<ExtArgs>>): Prisma__TaskDescriptionClient<$Result.GetResult<Prisma.$TaskDescriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskDescription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskDescriptionFindFirstOrThrowArgs} args - Arguments to find a TaskDescription
     * @example
     * // Get one TaskDescription
     * const taskDescription = await prisma.taskDescription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskDescriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskDescriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskDescriptionClient<$Result.GetResult<Prisma.$TaskDescriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaskDescriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskDescriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskDescriptions
     * const taskDescriptions = await prisma.taskDescription.findMany()
     * 
     * // Get first 10 TaskDescriptions
     * const taskDescriptions = await prisma.taskDescription.findMany({ take: 10 })
     * 
     * // Only select the `taskId`
     * const taskDescriptionWithTaskIdOnly = await prisma.taskDescription.findMany({ select: { taskId: true } })
     * 
     */
    findMany<T extends TaskDescriptionFindManyArgs>(args?: SelectSubset<T, TaskDescriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskDescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaskDescription.
     * @param {TaskDescriptionCreateArgs} args - Arguments to create a TaskDescription.
     * @example
     * // Create one TaskDescription
     * const TaskDescription = await prisma.taskDescription.create({
     *   data: {
     *     // ... data to create a TaskDescription
     *   }
     * })
     * 
     */
    create<T extends TaskDescriptionCreateArgs>(args: SelectSubset<T, TaskDescriptionCreateArgs<ExtArgs>>): Prisma__TaskDescriptionClient<$Result.GetResult<Prisma.$TaskDescriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaskDescriptions.
     * @param {TaskDescriptionCreateManyArgs} args - Arguments to create many TaskDescriptions.
     * @example
     * // Create many TaskDescriptions
     * const taskDescription = await prisma.taskDescription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskDescriptionCreateManyArgs>(args?: SelectSubset<T, TaskDescriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskDescriptions and returns the data saved in the database.
     * @param {TaskDescriptionCreateManyAndReturnArgs} args - Arguments to create many TaskDescriptions.
     * @example
     * // Create many TaskDescriptions
     * const taskDescription = await prisma.taskDescription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskDescriptions and only return the `taskId`
     * const taskDescriptionWithTaskIdOnly = await prisma.taskDescription.createManyAndReturn({
     *   select: { taskId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskDescriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskDescriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskDescriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaskDescription.
     * @param {TaskDescriptionDeleteArgs} args - Arguments to delete one TaskDescription.
     * @example
     * // Delete one TaskDescription
     * const TaskDescription = await prisma.taskDescription.delete({
     *   where: {
     *     // ... filter to delete one TaskDescription
     *   }
     * })
     * 
     */
    delete<T extends TaskDescriptionDeleteArgs>(args: SelectSubset<T, TaskDescriptionDeleteArgs<ExtArgs>>): Prisma__TaskDescriptionClient<$Result.GetResult<Prisma.$TaskDescriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaskDescription.
     * @param {TaskDescriptionUpdateArgs} args - Arguments to update one TaskDescription.
     * @example
     * // Update one TaskDescription
     * const taskDescription = await prisma.taskDescription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskDescriptionUpdateArgs>(args: SelectSubset<T, TaskDescriptionUpdateArgs<ExtArgs>>): Prisma__TaskDescriptionClient<$Result.GetResult<Prisma.$TaskDescriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaskDescriptions.
     * @param {TaskDescriptionDeleteManyArgs} args - Arguments to filter TaskDescriptions to delete.
     * @example
     * // Delete a few TaskDescriptions
     * const { count } = await prisma.taskDescription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDescriptionDeleteManyArgs>(args?: SelectSubset<T, TaskDescriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskDescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskDescriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskDescriptions
     * const taskDescription = await prisma.taskDescription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskDescriptionUpdateManyArgs>(args: SelectSubset<T, TaskDescriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskDescriptions and returns the data updated in the database.
     * @param {TaskDescriptionUpdateManyAndReturnArgs} args - Arguments to update many TaskDescriptions.
     * @example
     * // Update many TaskDescriptions
     * const taskDescription = await prisma.taskDescription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaskDescriptions and only return the `taskId`
     * const taskDescriptionWithTaskIdOnly = await prisma.taskDescription.updateManyAndReturn({
     *   select: { taskId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskDescriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskDescriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskDescriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaskDescription.
     * @param {TaskDescriptionUpsertArgs} args - Arguments to update or create a TaskDescription.
     * @example
     * // Update or create a TaskDescription
     * const taskDescription = await prisma.taskDescription.upsert({
     *   create: {
     *     // ... data to create a TaskDescription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskDescription we want to update
     *   }
     * })
     */
    upsert<T extends TaskDescriptionUpsertArgs>(args: SelectSubset<T, TaskDescriptionUpsertArgs<ExtArgs>>): Prisma__TaskDescriptionClient<$Result.GetResult<Prisma.$TaskDescriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaskDescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskDescriptionCountArgs} args - Arguments to filter TaskDescriptions to count.
     * @example
     * // Count the number of TaskDescriptions
     * const count = await prisma.taskDescription.count({
     *   where: {
     *     // ... the filter for the TaskDescriptions we want to count
     *   }
     * })
    **/
    count<T extends TaskDescriptionCountArgs>(
      args?: Subset<T, TaskDescriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskDescriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskDescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskDescriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskDescriptionAggregateArgs>(args: Subset<T, TaskDescriptionAggregateArgs>): Prisma.PrismaPromise<GetTaskDescriptionAggregateType<T>>

    /**
     * Group by TaskDescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskDescriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskDescriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskDescriptionGroupByArgs['orderBy'] }
        : { orderBy?: TaskDescriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskDescriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskDescriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskDescription model
   */
  readonly fields: TaskDescriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskDescription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskDescriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskDescription model
   */
  interface TaskDescriptionFieldRefs {
    readonly taskId: FieldRef<"TaskDescription", 'String'>
    readonly description: FieldRef<"TaskDescription", 'String'>
    readonly businessRequirements: FieldRef<"TaskDescription", 'String'>
    readonly technicalRequirements: FieldRef<"TaskDescription", 'String'>
    readonly acceptanceCriteria: FieldRef<"TaskDescription", 'Json'>
    readonly createdAt: FieldRef<"TaskDescription", 'DateTime'>
    readonly updatedAt: FieldRef<"TaskDescription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaskDescription findUnique
   */
  export type TaskDescriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskDescription
     */
    select?: TaskDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskDescription
     */
    omit?: TaskDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskDescriptionInclude<ExtArgs> | null
    /**
     * Filter, which TaskDescription to fetch.
     */
    where: TaskDescriptionWhereUniqueInput
  }

  /**
   * TaskDescription findUniqueOrThrow
   */
  export type TaskDescriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskDescription
     */
    select?: TaskDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskDescription
     */
    omit?: TaskDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskDescriptionInclude<ExtArgs> | null
    /**
     * Filter, which TaskDescription to fetch.
     */
    where: TaskDescriptionWhereUniqueInput
  }

  /**
   * TaskDescription findFirst
   */
  export type TaskDescriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskDescription
     */
    select?: TaskDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskDescription
     */
    omit?: TaskDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskDescriptionInclude<ExtArgs> | null
    /**
     * Filter, which TaskDescription to fetch.
     */
    where?: TaskDescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskDescriptions to fetch.
     */
    orderBy?: TaskDescriptionOrderByWithRelationInput | TaskDescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskDescriptions.
     */
    cursor?: TaskDescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskDescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskDescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskDescriptions.
     */
    distinct?: TaskDescriptionScalarFieldEnum | TaskDescriptionScalarFieldEnum[]
  }

  /**
   * TaskDescription findFirstOrThrow
   */
  export type TaskDescriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskDescription
     */
    select?: TaskDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskDescription
     */
    omit?: TaskDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskDescriptionInclude<ExtArgs> | null
    /**
     * Filter, which TaskDescription to fetch.
     */
    where?: TaskDescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskDescriptions to fetch.
     */
    orderBy?: TaskDescriptionOrderByWithRelationInput | TaskDescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskDescriptions.
     */
    cursor?: TaskDescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskDescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskDescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskDescriptions.
     */
    distinct?: TaskDescriptionScalarFieldEnum | TaskDescriptionScalarFieldEnum[]
  }

  /**
   * TaskDescription findMany
   */
  export type TaskDescriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskDescription
     */
    select?: TaskDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskDescription
     */
    omit?: TaskDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskDescriptionInclude<ExtArgs> | null
    /**
     * Filter, which TaskDescriptions to fetch.
     */
    where?: TaskDescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskDescriptions to fetch.
     */
    orderBy?: TaskDescriptionOrderByWithRelationInput | TaskDescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskDescriptions.
     */
    cursor?: TaskDescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskDescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskDescriptions.
     */
    skip?: number
    distinct?: TaskDescriptionScalarFieldEnum | TaskDescriptionScalarFieldEnum[]
  }

  /**
   * TaskDescription create
   */
  export type TaskDescriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskDescription
     */
    select?: TaskDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskDescription
     */
    omit?: TaskDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskDescriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskDescription.
     */
    data: XOR<TaskDescriptionCreateInput, TaskDescriptionUncheckedCreateInput>
  }

  /**
   * TaskDescription createMany
   */
  export type TaskDescriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskDescriptions.
     */
    data: TaskDescriptionCreateManyInput | TaskDescriptionCreateManyInput[]
  }

  /**
   * TaskDescription createManyAndReturn
   */
  export type TaskDescriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskDescription
     */
    select?: TaskDescriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskDescription
     */
    omit?: TaskDescriptionOmit<ExtArgs> | null
    /**
     * The data used to create many TaskDescriptions.
     */
    data: TaskDescriptionCreateManyInput | TaskDescriptionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskDescriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskDescription update
   */
  export type TaskDescriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskDescription
     */
    select?: TaskDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskDescription
     */
    omit?: TaskDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskDescriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskDescription.
     */
    data: XOR<TaskDescriptionUpdateInput, TaskDescriptionUncheckedUpdateInput>
    /**
     * Choose, which TaskDescription to update.
     */
    where: TaskDescriptionWhereUniqueInput
  }

  /**
   * TaskDescription updateMany
   */
  export type TaskDescriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskDescriptions.
     */
    data: XOR<TaskDescriptionUpdateManyMutationInput, TaskDescriptionUncheckedUpdateManyInput>
    /**
     * Filter which TaskDescriptions to update
     */
    where?: TaskDescriptionWhereInput
    /**
     * Limit how many TaskDescriptions to update.
     */
    limit?: number
  }

  /**
   * TaskDescription updateManyAndReturn
   */
  export type TaskDescriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskDescription
     */
    select?: TaskDescriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskDescription
     */
    omit?: TaskDescriptionOmit<ExtArgs> | null
    /**
     * The data used to update TaskDescriptions.
     */
    data: XOR<TaskDescriptionUpdateManyMutationInput, TaskDescriptionUncheckedUpdateManyInput>
    /**
     * Filter which TaskDescriptions to update
     */
    where?: TaskDescriptionWhereInput
    /**
     * Limit how many TaskDescriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskDescriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskDescription upsert
   */
  export type TaskDescriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskDescription
     */
    select?: TaskDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskDescription
     */
    omit?: TaskDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskDescriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskDescription to update in case it exists.
     */
    where: TaskDescriptionWhereUniqueInput
    /**
     * In case the TaskDescription found by the `where` argument doesn't exist, create a new TaskDescription with this data.
     */
    create: XOR<TaskDescriptionCreateInput, TaskDescriptionUncheckedCreateInput>
    /**
     * In case the TaskDescription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskDescriptionUpdateInput, TaskDescriptionUncheckedUpdateInput>
  }

  /**
   * TaskDescription delete
   */
  export type TaskDescriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskDescription
     */
    select?: TaskDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskDescription
     */
    omit?: TaskDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskDescriptionInclude<ExtArgs> | null
    /**
     * Filter which TaskDescription to delete.
     */
    where: TaskDescriptionWhereUniqueInput
  }

  /**
   * TaskDescription deleteMany
   */
  export type TaskDescriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskDescriptions to delete
     */
    where?: TaskDescriptionWhereInput
    /**
     * Limit how many TaskDescriptions to delete.
     */
    limit?: number
  }

  /**
   * TaskDescription without action
   */
  export type TaskDescriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskDescription
     */
    select?: TaskDescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskDescription
     */
    omit?: TaskDescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskDescriptionInclude<ExtArgs> | null
  }


  /**
   * Model ImplementationPlan
   */

  export type AggregateImplementationPlan = {
    _count: ImplementationPlanCountAggregateOutputType | null
    _avg: ImplementationPlanAvgAggregateOutputType | null
    _sum: ImplementationPlanSumAggregateOutputType | null
    _min: ImplementationPlanMinAggregateOutputType | null
    _max: ImplementationPlanMaxAggregateOutputType | null
  }

  export type ImplementationPlanAvgAggregateOutputType = {
    id: number | null
  }

  export type ImplementationPlanSumAggregateOutputType = {
    id: number | null
  }

  export type ImplementationPlanMinAggregateOutputType = {
    id: number | null
    taskId: string | null
    overview: string | null
    approach: string | null
    technicalDecisions: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
  }

  export type ImplementationPlanMaxAggregateOutputType = {
    id: number | null
    taskId: string | null
    overview: string | null
    approach: string | null
    technicalDecisions: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
  }

  export type ImplementationPlanCountAggregateOutputType = {
    id: number
    taskId: number
    overview: number
    approach: number
    technicalDecisions: number
    filesToModify: number
    createdAt: number
    updatedAt: number
    createdBy: number
    _all: number
  }


  export type ImplementationPlanAvgAggregateInputType = {
    id?: true
  }

  export type ImplementationPlanSumAggregateInputType = {
    id?: true
  }

  export type ImplementationPlanMinAggregateInputType = {
    id?: true
    taskId?: true
    overview?: true
    approach?: true
    technicalDecisions?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
  }

  export type ImplementationPlanMaxAggregateInputType = {
    id?: true
    taskId?: true
    overview?: true
    approach?: true
    technicalDecisions?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
  }

  export type ImplementationPlanCountAggregateInputType = {
    id?: true
    taskId?: true
    overview?: true
    approach?: true
    technicalDecisions?: true
    filesToModify?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    _all?: true
  }

  export type ImplementationPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImplementationPlan to aggregate.
     */
    where?: ImplementationPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImplementationPlans to fetch.
     */
    orderBy?: ImplementationPlanOrderByWithRelationInput | ImplementationPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImplementationPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImplementationPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImplementationPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ImplementationPlans
    **/
    _count?: true | ImplementationPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImplementationPlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImplementationPlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImplementationPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImplementationPlanMaxAggregateInputType
  }

  export type GetImplementationPlanAggregateType<T extends ImplementationPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateImplementationPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImplementationPlan[P]>
      : GetScalarType<T[P], AggregateImplementationPlan[P]>
  }




  export type ImplementationPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImplementationPlanWhereInput
    orderBy?: ImplementationPlanOrderByWithAggregationInput | ImplementationPlanOrderByWithAggregationInput[]
    by: ImplementationPlanScalarFieldEnum[] | ImplementationPlanScalarFieldEnum
    having?: ImplementationPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImplementationPlanCountAggregateInputType | true
    _avg?: ImplementationPlanAvgAggregateInputType
    _sum?: ImplementationPlanSumAggregateInputType
    _min?: ImplementationPlanMinAggregateInputType
    _max?: ImplementationPlanMaxAggregateInputType
  }

  export type ImplementationPlanGroupByOutputType = {
    id: number
    taskId: string
    overview: string
    approach: string
    technicalDecisions: string
    filesToModify: JsonValue
    createdAt: Date
    updatedAt: Date
    createdBy: string
    _count: ImplementationPlanCountAggregateOutputType | null
    _avg: ImplementationPlanAvgAggregateOutputType | null
    _sum: ImplementationPlanSumAggregateOutputType | null
    _min: ImplementationPlanMinAggregateOutputType | null
    _max: ImplementationPlanMaxAggregateOutputType | null
  }

  type GetImplementationPlanGroupByPayload<T extends ImplementationPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImplementationPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImplementationPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImplementationPlanGroupByOutputType[P]>
            : GetScalarType<T[P], ImplementationPlanGroupByOutputType[P]>
        }
      >
    >


  export type ImplementationPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    overview?: boolean
    approach?: boolean
    technicalDecisions?: boolean
    filesToModify?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    subtasks?: boolean | ImplementationPlan$subtasksArgs<ExtArgs>
    _count?: boolean | ImplementationPlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["implementationPlan"]>

  export type ImplementationPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    overview?: boolean
    approach?: boolean
    technicalDecisions?: boolean
    filesToModify?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["implementationPlan"]>

  export type ImplementationPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    overview?: boolean
    approach?: boolean
    technicalDecisions?: boolean
    filesToModify?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["implementationPlan"]>

  export type ImplementationPlanSelectScalar = {
    id?: boolean
    taskId?: boolean
    overview?: boolean
    approach?: boolean
    technicalDecisions?: boolean
    filesToModify?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
  }

  export type ImplementationPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "overview" | "approach" | "technicalDecisions" | "filesToModify" | "createdAt" | "updatedAt" | "createdBy", ExtArgs["result"]["implementationPlan"]>
  export type ImplementationPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    subtasks?: boolean | ImplementationPlan$subtasksArgs<ExtArgs>
    _count?: boolean | ImplementationPlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ImplementationPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type ImplementationPlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }

  export type $ImplementationPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ImplementationPlan"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      subtasks: Prisma.$SubtaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      taskId: string
      overview: string
      approach: string
      technicalDecisions: string
      filesToModify: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
      createdBy: string
    }, ExtArgs["result"]["implementationPlan"]>
    composites: {}
  }

  type ImplementationPlanGetPayload<S extends boolean | null | undefined | ImplementationPlanDefaultArgs> = $Result.GetResult<Prisma.$ImplementationPlanPayload, S>

  type ImplementationPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImplementationPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImplementationPlanCountAggregateInputType | true
    }

  export interface ImplementationPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ImplementationPlan'], meta: { name: 'ImplementationPlan' } }
    /**
     * Find zero or one ImplementationPlan that matches the filter.
     * @param {ImplementationPlanFindUniqueArgs} args - Arguments to find a ImplementationPlan
     * @example
     * // Get one ImplementationPlan
     * const implementationPlan = await prisma.implementationPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImplementationPlanFindUniqueArgs>(args: SelectSubset<T, ImplementationPlanFindUniqueArgs<ExtArgs>>): Prisma__ImplementationPlanClient<$Result.GetResult<Prisma.$ImplementationPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ImplementationPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImplementationPlanFindUniqueOrThrowArgs} args - Arguments to find a ImplementationPlan
     * @example
     * // Get one ImplementationPlan
     * const implementationPlan = await prisma.implementationPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImplementationPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, ImplementationPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImplementationPlanClient<$Result.GetResult<Prisma.$ImplementationPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImplementationPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImplementationPlanFindFirstArgs} args - Arguments to find a ImplementationPlan
     * @example
     * // Get one ImplementationPlan
     * const implementationPlan = await prisma.implementationPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImplementationPlanFindFirstArgs>(args?: SelectSubset<T, ImplementationPlanFindFirstArgs<ExtArgs>>): Prisma__ImplementationPlanClient<$Result.GetResult<Prisma.$ImplementationPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImplementationPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImplementationPlanFindFirstOrThrowArgs} args - Arguments to find a ImplementationPlan
     * @example
     * // Get one ImplementationPlan
     * const implementationPlan = await prisma.implementationPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImplementationPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, ImplementationPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImplementationPlanClient<$Result.GetResult<Prisma.$ImplementationPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ImplementationPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImplementationPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ImplementationPlans
     * const implementationPlans = await prisma.implementationPlan.findMany()
     * 
     * // Get first 10 ImplementationPlans
     * const implementationPlans = await prisma.implementationPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const implementationPlanWithIdOnly = await prisma.implementationPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImplementationPlanFindManyArgs>(args?: SelectSubset<T, ImplementationPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImplementationPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ImplementationPlan.
     * @param {ImplementationPlanCreateArgs} args - Arguments to create a ImplementationPlan.
     * @example
     * // Create one ImplementationPlan
     * const ImplementationPlan = await prisma.implementationPlan.create({
     *   data: {
     *     // ... data to create a ImplementationPlan
     *   }
     * })
     * 
     */
    create<T extends ImplementationPlanCreateArgs>(args: SelectSubset<T, ImplementationPlanCreateArgs<ExtArgs>>): Prisma__ImplementationPlanClient<$Result.GetResult<Prisma.$ImplementationPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ImplementationPlans.
     * @param {ImplementationPlanCreateManyArgs} args - Arguments to create many ImplementationPlans.
     * @example
     * // Create many ImplementationPlans
     * const implementationPlan = await prisma.implementationPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImplementationPlanCreateManyArgs>(args?: SelectSubset<T, ImplementationPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ImplementationPlans and returns the data saved in the database.
     * @param {ImplementationPlanCreateManyAndReturnArgs} args - Arguments to create many ImplementationPlans.
     * @example
     * // Create many ImplementationPlans
     * const implementationPlan = await prisma.implementationPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ImplementationPlans and only return the `id`
     * const implementationPlanWithIdOnly = await prisma.implementationPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ImplementationPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, ImplementationPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImplementationPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ImplementationPlan.
     * @param {ImplementationPlanDeleteArgs} args - Arguments to delete one ImplementationPlan.
     * @example
     * // Delete one ImplementationPlan
     * const ImplementationPlan = await prisma.implementationPlan.delete({
     *   where: {
     *     // ... filter to delete one ImplementationPlan
     *   }
     * })
     * 
     */
    delete<T extends ImplementationPlanDeleteArgs>(args: SelectSubset<T, ImplementationPlanDeleteArgs<ExtArgs>>): Prisma__ImplementationPlanClient<$Result.GetResult<Prisma.$ImplementationPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ImplementationPlan.
     * @param {ImplementationPlanUpdateArgs} args - Arguments to update one ImplementationPlan.
     * @example
     * // Update one ImplementationPlan
     * const implementationPlan = await prisma.implementationPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImplementationPlanUpdateArgs>(args: SelectSubset<T, ImplementationPlanUpdateArgs<ExtArgs>>): Prisma__ImplementationPlanClient<$Result.GetResult<Prisma.$ImplementationPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ImplementationPlans.
     * @param {ImplementationPlanDeleteManyArgs} args - Arguments to filter ImplementationPlans to delete.
     * @example
     * // Delete a few ImplementationPlans
     * const { count } = await prisma.implementationPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImplementationPlanDeleteManyArgs>(args?: SelectSubset<T, ImplementationPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImplementationPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImplementationPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ImplementationPlans
     * const implementationPlan = await prisma.implementationPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImplementationPlanUpdateManyArgs>(args: SelectSubset<T, ImplementationPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImplementationPlans and returns the data updated in the database.
     * @param {ImplementationPlanUpdateManyAndReturnArgs} args - Arguments to update many ImplementationPlans.
     * @example
     * // Update many ImplementationPlans
     * const implementationPlan = await prisma.implementationPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ImplementationPlans and only return the `id`
     * const implementationPlanWithIdOnly = await prisma.implementationPlan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ImplementationPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, ImplementationPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImplementationPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ImplementationPlan.
     * @param {ImplementationPlanUpsertArgs} args - Arguments to update or create a ImplementationPlan.
     * @example
     * // Update or create a ImplementationPlan
     * const implementationPlan = await prisma.implementationPlan.upsert({
     *   create: {
     *     // ... data to create a ImplementationPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ImplementationPlan we want to update
     *   }
     * })
     */
    upsert<T extends ImplementationPlanUpsertArgs>(args: SelectSubset<T, ImplementationPlanUpsertArgs<ExtArgs>>): Prisma__ImplementationPlanClient<$Result.GetResult<Prisma.$ImplementationPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ImplementationPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImplementationPlanCountArgs} args - Arguments to filter ImplementationPlans to count.
     * @example
     * // Count the number of ImplementationPlans
     * const count = await prisma.implementationPlan.count({
     *   where: {
     *     // ... the filter for the ImplementationPlans we want to count
     *   }
     * })
    **/
    count<T extends ImplementationPlanCountArgs>(
      args?: Subset<T, ImplementationPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImplementationPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ImplementationPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImplementationPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImplementationPlanAggregateArgs>(args: Subset<T, ImplementationPlanAggregateArgs>): Prisma.PrismaPromise<GetImplementationPlanAggregateType<T>>

    /**
     * Group by ImplementationPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImplementationPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImplementationPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImplementationPlanGroupByArgs['orderBy'] }
        : { orderBy?: ImplementationPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImplementationPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImplementationPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ImplementationPlan model
   */
  readonly fields: ImplementationPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ImplementationPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImplementationPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subtasks<T extends ImplementationPlan$subtasksArgs<ExtArgs> = {}>(args?: Subset<T, ImplementationPlan$subtasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ImplementationPlan model
   */
  interface ImplementationPlanFieldRefs {
    readonly id: FieldRef<"ImplementationPlan", 'Int'>
    readonly taskId: FieldRef<"ImplementationPlan", 'String'>
    readonly overview: FieldRef<"ImplementationPlan", 'String'>
    readonly approach: FieldRef<"ImplementationPlan", 'String'>
    readonly technicalDecisions: FieldRef<"ImplementationPlan", 'String'>
    readonly filesToModify: FieldRef<"ImplementationPlan", 'Json'>
    readonly createdAt: FieldRef<"ImplementationPlan", 'DateTime'>
    readonly updatedAt: FieldRef<"ImplementationPlan", 'DateTime'>
    readonly createdBy: FieldRef<"ImplementationPlan", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ImplementationPlan findUnique
   */
  export type ImplementationPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImplementationPlan
     */
    select?: ImplementationPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImplementationPlan
     */
    omit?: ImplementationPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementationPlanInclude<ExtArgs> | null
    /**
     * Filter, which ImplementationPlan to fetch.
     */
    where: ImplementationPlanWhereUniqueInput
  }

  /**
   * ImplementationPlan findUniqueOrThrow
   */
  export type ImplementationPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImplementationPlan
     */
    select?: ImplementationPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImplementationPlan
     */
    omit?: ImplementationPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementationPlanInclude<ExtArgs> | null
    /**
     * Filter, which ImplementationPlan to fetch.
     */
    where: ImplementationPlanWhereUniqueInput
  }

  /**
   * ImplementationPlan findFirst
   */
  export type ImplementationPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImplementationPlan
     */
    select?: ImplementationPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImplementationPlan
     */
    omit?: ImplementationPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementationPlanInclude<ExtArgs> | null
    /**
     * Filter, which ImplementationPlan to fetch.
     */
    where?: ImplementationPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImplementationPlans to fetch.
     */
    orderBy?: ImplementationPlanOrderByWithRelationInput | ImplementationPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImplementationPlans.
     */
    cursor?: ImplementationPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImplementationPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImplementationPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImplementationPlans.
     */
    distinct?: ImplementationPlanScalarFieldEnum | ImplementationPlanScalarFieldEnum[]
  }

  /**
   * ImplementationPlan findFirstOrThrow
   */
  export type ImplementationPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImplementationPlan
     */
    select?: ImplementationPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImplementationPlan
     */
    omit?: ImplementationPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementationPlanInclude<ExtArgs> | null
    /**
     * Filter, which ImplementationPlan to fetch.
     */
    where?: ImplementationPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImplementationPlans to fetch.
     */
    orderBy?: ImplementationPlanOrderByWithRelationInput | ImplementationPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImplementationPlans.
     */
    cursor?: ImplementationPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImplementationPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImplementationPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImplementationPlans.
     */
    distinct?: ImplementationPlanScalarFieldEnum | ImplementationPlanScalarFieldEnum[]
  }

  /**
   * ImplementationPlan findMany
   */
  export type ImplementationPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImplementationPlan
     */
    select?: ImplementationPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImplementationPlan
     */
    omit?: ImplementationPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementationPlanInclude<ExtArgs> | null
    /**
     * Filter, which ImplementationPlans to fetch.
     */
    where?: ImplementationPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImplementationPlans to fetch.
     */
    orderBy?: ImplementationPlanOrderByWithRelationInput | ImplementationPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ImplementationPlans.
     */
    cursor?: ImplementationPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImplementationPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImplementationPlans.
     */
    skip?: number
    distinct?: ImplementationPlanScalarFieldEnum | ImplementationPlanScalarFieldEnum[]
  }

  /**
   * ImplementationPlan create
   */
  export type ImplementationPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImplementationPlan
     */
    select?: ImplementationPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImplementationPlan
     */
    omit?: ImplementationPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementationPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a ImplementationPlan.
     */
    data: XOR<ImplementationPlanCreateInput, ImplementationPlanUncheckedCreateInput>
  }

  /**
   * ImplementationPlan createMany
   */
  export type ImplementationPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ImplementationPlans.
     */
    data: ImplementationPlanCreateManyInput | ImplementationPlanCreateManyInput[]
  }

  /**
   * ImplementationPlan createManyAndReturn
   */
  export type ImplementationPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImplementationPlan
     */
    select?: ImplementationPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImplementationPlan
     */
    omit?: ImplementationPlanOmit<ExtArgs> | null
    /**
     * The data used to create many ImplementationPlans.
     */
    data: ImplementationPlanCreateManyInput | ImplementationPlanCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementationPlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ImplementationPlan update
   */
  export type ImplementationPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImplementationPlan
     */
    select?: ImplementationPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImplementationPlan
     */
    omit?: ImplementationPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementationPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a ImplementationPlan.
     */
    data: XOR<ImplementationPlanUpdateInput, ImplementationPlanUncheckedUpdateInput>
    /**
     * Choose, which ImplementationPlan to update.
     */
    where: ImplementationPlanWhereUniqueInput
  }

  /**
   * ImplementationPlan updateMany
   */
  export type ImplementationPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ImplementationPlans.
     */
    data: XOR<ImplementationPlanUpdateManyMutationInput, ImplementationPlanUncheckedUpdateManyInput>
    /**
     * Filter which ImplementationPlans to update
     */
    where?: ImplementationPlanWhereInput
    /**
     * Limit how many ImplementationPlans to update.
     */
    limit?: number
  }

  /**
   * ImplementationPlan updateManyAndReturn
   */
  export type ImplementationPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImplementationPlan
     */
    select?: ImplementationPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImplementationPlan
     */
    omit?: ImplementationPlanOmit<ExtArgs> | null
    /**
     * The data used to update ImplementationPlans.
     */
    data: XOR<ImplementationPlanUpdateManyMutationInput, ImplementationPlanUncheckedUpdateManyInput>
    /**
     * Filter which ImplementationPlans to update
     */
    where?: ImplementationPlanWhereInput
    /**
     * Limit how many ImplementationPlans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementationPlanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ImplementationPlan upsert
   */
  export type ImplementationPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImplementationPlan
     */
    select?: ImplementationPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImplementationPlan
     */
    omit?: ImplementationPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementationPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the ImplementationPlan to update in case it exists.
     */
    where: ImplementationPlanWhereUniqueInput
    /**
     * In case the ImplementationPlan found by the `where` argument doesn't exist, create a new ImplementationPlan with this data.
     */
    create: XOR<ImplementationPlanCreateInput, ImplementationPlanUncheckedCreateInput>
    /**
     * In case the ImplementationPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImplementationPlanUpdateInput, ImplementationPlanUncheckedUpdateInput>
  }

  /**
   * ImplementationPlan delete
   */
  export type ImplementationPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImplementationPlan
     */
    select?: ImplementationPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImplementationPlan
     */
    omit?: ImplementationPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementationPlanInclude<ExtArgs> | null
    /**
     * Filter which ImplementationPlan to delete.
     */
    where: ImplementationPlanWhereUniqueInput
  }

  /**
   * ImplementationPlan deleteMany
   */
  export type ImplementationPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImplementationPlans to delete
     */
    where?: ImplementationPlanWhereInput
    /**
     * Limit how many ImplementationPlans to delete.
     */
    limit?: number
  }

  /**
   * ImplementationPlan.subtasks
   */
  export type ImplementationPlan$subtasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    where?: SubtaskWhereInput
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    cursor?: SubtaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[]
  }

  /**
   * ImplementationPlan without action
   */
  export type ImplementationPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImplementationPlan
     */
    select?: ImplementationPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImplementationPlan
     */
    omit?: ImplementationPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImplementationPlanInclude<ExtArgs> | null
  }


  /**
   * Model Subtask
   */

  export type AggregateSubtask = {
    _count: SubtaskCountAggregateOutputType | null
    _avg: SubtaskAvgAggregateOutputType | null
    _sum: SubtaskSumAggregateOutputType | null
    _min: SubtaskMinAggregateOutputType | null
    _max: SubtaskMaxAggregateOutputType | null
  }

  export type SubtaskAvgAggregateOutputType = {
    id: number | null
    planId: number | null
    sequenceNumber: number | null
  }

  export type SubtaskSumAggregateOutputType = {
    id: number | null
    planId: number | null
    sequenceNumber: number | null
  }

  export type SubtaskMinAggregateOutputType = {
    id: number | null
    taskId: string | null
    planId: number | null
    name: string | null
    description: string | null
    sequenceNumber: number | null
    status: string | null
    assignedTo: string | null
    estimatedDuration: string | null
    startedAt: Date | null
    completedAt: Date | null
    batchId: string | null
    batchTitle: string | null
  }

  export type SubtaskMaxAggregateOutputType = {
    id: number | null
    taskId: string | null
    planId: number | null
    name: string | null
    description: string | null
    sequenceNumber: number | null
    status: string | null
    assignedTo: string | null
    estimatedDuration: string | null
    startedAt: Date | null
    completedAt: Date | null
    batchId: string | null
    batchTitle: string | null
  }

  export type SubtaskCountAggregateOutputType = {
    id: number
    taskId: number
    planId: number
    name: number
    description: number
    sequenceNumber: number
    status: number
    assignedTo: number
    estimatedDuration: number
    startedAt: number
    completedAt: number
    batchId: number
    batchTitle: number
    _all: number
  }


  export type SubtaskAvgAggregateInputType = {
    id?: true
    planId?: true
    sequenceNumber?: true
  }

  export type SubtaskSumAggregateInputType = {
    id?: true
    planId?: true
    sequenceNumber?: true
  }

  export type SubtaskMinAggregateInputType = {
    id?: true
    taskId?: true
    planId?: true
    name?: true
    description?: true
    sequenceNumber?: true
    status?: true
    assignedTo?: true
    estimatedDuration?: true
    startedAt?: true
    completedAt?: true
    batchId?: true
    batchTitle?: true
  }

  export type SubtaskMaxAggregateInputType = {
    id?: true
    taskId?: true
    planId?: true
    name?: true
    description?: true
    sequenceNumber?: true
    status?: true
    assignedTo?: true
    estimatedDuration?: true
    startedAt?: true
    completedAt?: true
    batchId?: true
    batchTitle?: true
  }

  export type SubtaskCountAggregateInputType = {
    id?: true
    taskId?: true
    planId?: true
    name?: true
    description?: true
    sequenceNumber?: true
    status?: true
    assignedTo?: true
    estimatedDuration?: true
    startedAt?: true
    completedAt?: true
    batchId?: true
    batchTitle?: true
    _all?: true
  }

  export type SubtaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subtask to aggregate.
     */
    where?: SubtaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subtasks to fetch.
     */
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubtaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subtasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subtasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subtasks
    **/
    _count?: true | SubtaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubtaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubtaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubtaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubtaskMaxAggregateInputType
  }

  export type GetSubtaskAggregateType<T extends SubtaskAggregateArgs> = {
        [P in keyof T & keyof AggregateSubtask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubtask[P]>
      : GetScalarType<T[P], AggregateSubtask[P]>
  }




  export type SubtaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubtaskWhereInput
    orderBy?: SubtaskOrderByWithAggregationInput | SubtaskOrderByWithAggregationInput[]
    by: SubtaskScalarFieldEnum[] | SubtaskScalarFieldEnum
    having?: SubtaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubtaskCountAggregateInputType | true
    _avg?: SubtaskAvgAggregateInputType
    _sum?: SubtaskSumAggregateInputType
    _min?: SubtaskMinAggregateInputType
    _max?: SubtaskMaxAggregateInputType
  }

  export type SubtaskGroupByOutputType = {
    id: number
    taskId: string
    planId: number
    name: string
    description: string
    sequenceNumber: number
    status: string
    assignedTo: string | null
    estimatedDuration: string | null
    startedAt: Date | null
    completedAt: Date | null
    batchId: string | null
    batchTitle: string | null
    _count: SubtaskCountAggregateOutputType | null
    _avg: SubtaskAvgAggregateOutputType | null
    _sum: SubtaskSumAggregateOutputType | null
    _min: SubtaskMinAggregateOutputType | null
    _max: SubtaskMaxAggregateOutputType | null
  }

  type GetSubtaskGroupByPayload<T extends SubtaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubtaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubtaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubtaskGroupByOutputType[P]>
            : GetScalarType<T[P], SubtaskGroupByOutputType[P]>
        }
      >
    >


  export type SubtaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    planId?: boolean
    name?: boolean
    description?: boolean
    sequenceNumber?: boolean
    status?: boolean
    assignedTo?: boolean
    estimatedDuration?: boolean
    startedAt?: boolean
    completedAt?: boolean
    batchId?: boolean
    batchTitle?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    plan?: boolean | ImplementationPlanDefaultArgs<ExtArgs>
    delegationRecords?: boolean | Subtask$delegationRecordsArgs<ExtArgs>
    comments?: boolean | Subtask$commentsArgs<ExtArgs>
    _count?: boolean | SubtaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subtask"]>

  export type SubtaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    planId?: boolean
    name?: boolean
    description?: boolean
    sequenceNumber?: boolean
    status?: boolean
    assignedTo?: boolean
    estimatedDuration?: boolean
    startedAt?: boolean
    completedAt?: boolean
    batchId?: boolean
    batchTitle?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    plan?: boolean | ImplementationPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subtask"]>

  export type SubtaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    planId?: boolean
    name?: boolean
    description?: boolean
    sequenceNumber?: boolean
    status?: boolean
    assignedTo?: boolean
    estimatedDuration?: boolean
    startedAt?: boolean
    completedAt?: boolean
    batchId?: boolean
    batchTitle?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    plan?: boolean | ImplementationPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subtask"]>

  export type SubtaskSelectScalar = {
    id?: boolean
    taskId?: boolean
    planId?: boolean
    name?: boolean
    description?: boolean
    sequenceNumber?: boolean
    status?: boolean
    assignedTo?: boolean
    estimatedDuration?: boolean
    startedAt?: boolean
    completedAt?: boolean
    batchId?: boolean
    batchTitle?: boolean
  }

  export type SubtaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "planId" | "name" | "description" | "sequenceNumber" | "status" | "assignedTo" | "estimatedDuration" | "startedAt" | "completedAt" | "batchId" | "batchTitle", ExtArgs["result"]["subtask"]>
  export type SubtaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    plan?: boolean | ImplementationPlanDefaultArgs<ExtArgs>
    delegationRecords?: boolean | Subtask$delegationRecordsArgs<ExtArgs>
    comments?: boolean | Subtask$commentsArgs<ExtArgs>
    _count?: boolean | SubtaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubtaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    plan?: boolean | ImplementationPlanDefaultArgs<ExtArgs>
  }
  export type SubtaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    plan?: boolean | ImplementationPlanDefaultArgs<ExtArgs>
  }

  export type $SubtaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subtask"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      plan: Prisma.$ImplementationPlanPayload<ExtArgs>
      delegationRecords: Prisma.$DelegationRecordPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      taskId: string
      planId: number
      name: string
      description: string
      sequenceNumber: number
      status: string
      assignedTo: string | null
      estimatedDuration: string | null
      startedAt: Date | null
      completedAt: Date | null
      batchId: string | null
      batchTitle: string | null
    }, ExtArgs["result"]["subtask"]>
    composites: {}
  }

  type SubtaskGetPayload<S extends boolean | null | undefined | SubtaskDefaultArgs> = $Result.GetResult<Prisma.$SubtaskPayload, S>

  type SubtaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubtaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubtaskCountAggregateInputType | true
    }

  export interface SubtaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subtask'], meta: { name: 'Subtask' } }
    /**
     * Find zero or one Subtask that matches the filter.
     * @param {SubtaskFindUniqueArgs} args - Arguments to find a Subtask
     * @example
     * // Get one Subtask
     * const subtask = await prisma.subtask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubtaskFindUniqueArgs>(args: SelectSubset<T, SubtaskFindUniqueArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subtask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubtaskFindUniqueOrThrowArgs} args - Arguments to find a Subtask
     * @example
     * // Get one Subtask
     * const subtask = await prisma.subtask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubtaskFindUniqueOrThrowArgs>(args: SelectSubset<T, SubtaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subtask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskFindFirstArgs} args - Arguments to find a Subtask
     * @example
     * // Get one Subtask
     * const subtask = await prisma.subtask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubtaskFindFirstArgs>(args?: SelectSubset<T, SubtaskFindFirstArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subtask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskFindFirstOrThrowArgs} args - Arguments to find a Subtask
     * @example
     * // Get one Subtask
     * const subtask = await prisma.subtask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubtaskFindFirstOrThrowArgs>(args?: SelectSubset<T, SubtaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subtasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subtasks
     * const subtasks = await prisma.subtask.findMany()
     * 
     * // Get first 10 Subtasks
     * const subtasks = await prisma.subtask.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subtaskWithIdOnly = await prisma.subtask.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubtaskFindManyArgs>(args?: SelectSubset<T, SubtaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subtask.
     * @param {SubtaskCreateArgs} args - Arguments to create a Subtask.
     * @example
     * // Create one Subtask
     * const Subtask = await prisma.subtask.create({
     *   data: {
     *     // ... data to create a Subtask
     *   }
     * })
     * 
     */
    create<T extends SubtaskCreateArgs>(args: SelectSubset<T, SubtaskCreateArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subtasks.
     * @param {SubtaskCreateManyArgs} args - Arguments to create many Subtasks.
     * @example
     * // Create many Subtasks
     * const subtask = await prisma.subtask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubtaskCreateManyArgs>(args?: SelectSubset<T, SubtaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subtasks and returns the data saved in the database.
     * @param {SubtaskCreateManyAndReturnArgs} args - Arguments to create many Subtasks.
     * @example
     * // Create many Subtasks
     * const subtask = await prisma.subtask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subtasks and only return the `id`
     * const subtaskWithIdOnly = await prisma.subtask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubtaskCreateManyAndReturnArgs>(args?: SelectSubset<T, SubtaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subtask.
     * @param {SubtaskDeleteArgs} args - Arguments to delete one Subtask.
     * @example
     * // Delete one Subtask
     * const Subtask = await prisma.subtask.delete({
     *   where: {
     *     // ... filter to delete one Subtask
     *   }
     * })
     * 
     */
    delete<T extends SubtaskDeleteArgs>(args: SelectSubset<T, SubtaskDeleteArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subtask.
     * @param {SubtaskUpdateArgs} args - Arguments to update one Subtask.
     * @example
     * // Update one Subtask
     * const subtask = await prisma.subtask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubtaskUpdateArgs>(args: SelectSubset<T, SubtaskUpdateArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subtasks.
     * @param {SubtaskDeleteManyArgs} args - Arguments to filter Subtasks to delete.
     * @example
     * // Delete a few Subtasks
     * const { count } = await prisma.subtask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubtaskDeleteManyArgs>(args?: SelectSubset<T, SubtaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subtasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subtasks
     * const subtask = await prisma.subtask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubtaskUpdateManyArgs>(args: SelectSubset<T, SubtaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subtasks and returns the data updated in the database.
     * @param {SubtaskUpdateManyAndReturnArgs} args - Arguments to update many Subtasks.
     * @example
     * // Update many Subtasks
     * const subtask = await prisma.subtask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subtasks and only return the `id`
     * const subtaskWithIdOnly = await prisma.subtask.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubtaskUpdateManyAndReturnArgs>(args: SelectSubset<T, SubtaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subtask.
     * @param {SubtaskUpsertArgs} args - Arguments to update or create a Subtask.
     * @example
     * // Update or create a Subtask
     * const subtask = await prisma.subtask.upsert({
     *   create: {
     *     // ... data to create a Subtask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subtask we want to update
     *   }
     * })
     */
    upsert<T extends SubtaskUpsertArgs>(args: SelectSubset<T, SubtaskUpsertArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subtasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskCountArgs} args - Arguments to filter Subtasks to count.
     * @example
     * // Count the number of Subtasks
     * const count = await prisma.subtask.count({
     *   where: {
     *     // ... the filter for the Subtasks we want to count
     *   }
     * })
    **/
    count<T extends SubtaskCountArgs>(
      args?: Subset<T, SubtaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubtaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subtask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubtaskAggregateArgs>(args: Subset<T, SubtaskAggregateArgs>): Prisma.PrismaPromise<GetSubtaskAggregateType<T>>

    /**
     * Group by Subtask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubtaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubtaskGroupByArgs['orderBy'] }
        : { orderBy?: SubtaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubtaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubtaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subtask model
   */
  readonly fields: SubtaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subtask.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubtaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    plan<T extends ImplementationPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ImplementationPlanDefaultArgs<ExtArgs>>): Prisma__ImplementationPlanClient<$Result.GetResult<Prisma.$ImplementationPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    delegationRecords<T extends Subtask$delegationRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Subtask$delegationRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegationRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends Subtask$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Subtask$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subtask model
   */
  interface SubtaskFieldRefs {
    readonly id: FieldRef<"Subtask", 'Int'>
    readonly taskId: FieldRef<"Subtask", 'String'>
    readonly planId: FieldRef<"Subtask", 'Int'>
    readonly name: FieldRef<"Subtask", 'String'>
    readonly description: FieldRef<"Subtask", 'String'>
    readonly sequenceNumber: FieldRef<"Subtask", 'Int'>
    readonly status: FieldRef<"Subtask", 'String'>
    readonly assignedTo: FieldRef<"Subtask", 'String'>
    readonly estimatedDuration: FieldRef<"Subtask", 'String'>
    readonly startedAt: FieldRef<"Subtask", 'DateTime'>
    readonly completedAt: FieldRef<"Subtask", 'DateTime'>
    readonly batchId: FieldRef<"Subtask", 'String'>
    readonly batchTitle: FieldRef<"Subtask", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Subtask findUnique
   */
  export type SubtaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter, which Subtask to fetch.
     */
    where: SubtaskWhereUniqueInput
  }

  /**
   * Subtask findUniqueOrThrow
   */
  export type SubtaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter, which Subtask to fetch.
     */
    where: SubtaskWhereUniqueInput
  }

  /**
   * Subtask findFirst
   */
  export type SubtaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter, which Subtask to fetch.
     */
    where?: SubtaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subtasks to fetch.
     */
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subtasks.
     */
    cursor?: SubtaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subtasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subtasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subtasks.
     */
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[]
  }

  /**
   * Subtask findFirstOrThrow
   */
  export type SubtaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter, which Subtask to fetch.
     */
    where?: SubtaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subtasks to fetch.
     */
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subtasks.
     */
    cursor?: SubtaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subtasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subtasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subtasks.
     */
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[]
  }

  /**
   * Subtask findMany
   */
  export type SubtaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter, which Subtasks to fetch.
     */
    where?: SubtaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subtasks to fetch.
     */
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subtasks.
     */
    cursor?: SubtaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subtasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subtasks.
     */
    skip?: number
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[]
  }

  /**
   * Subtask create
   */
  export type SubtaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Subtask.
     */
    data: XOR<SubtaskCreateInput, SubtaskUncheckedCreateInput>
  }

  /**
   * Subtask createMany
   */
  export type SubtaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subtasks.
     */
    data: SubtaskCreateManyInput | SubtaskCreateManyInput[]
  }

  /**
   * Subtask createManyAndReturn
   */
  export type SubtaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * The data used to create many Subtasks.
     */
    data: SubtaskCreateManyInput | SubtaskCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subtask update
   */
  export type SubtaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Subtask.
     */
    data: XOR<SubtaskUpdateInput, SubtaskUncheckedUpdateInput>
    /**
     * Choose, which Subtask to update.
     */
    where: SubtaskWhereUniqueInput
  }

  /**
   * Subtask updateMany
   */
  export type SubtaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subtasks.
     */
    data: XOR<SubtaskUpdateManyMutationInput, SubtaskUncheckedUpdateManyInput>
    /**
     * Filter which Subtasks to update
     */
    where?: SubtaskWhereInput
    /**
     * Limit how many Subtasks to update.
     */
    limit?: number
  }

  /**
   * Subtask updateManyAndReturn
   */
  export type SubtaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * The data used to update Subtasks.
     */
    data: XOR<SubtaskUpdateManyMutationInput, SubtaskUncheckedUpdateManyInput>
    /**
     * Filter which Subtasks to update
     */
    where?: SubtaskWhereInput
    /**
     * Limit how many Subtasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subtask upsert
   */
  export type SubtaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Subtask to update in case it exists.
     */
    where: SubtaskWhereUniqueInput
    /**
     * In case the Subtask found by the `where` argument doesn't exist, create a new Subtask with this data.
     */
    create: XOR<SubtaskCreateInput, SubtaskUncheckedCreateInput>
    /**
     * In case the Subtask was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubtaskUpdateInput, SubtaskUncheckedUpdateInput>
  }

  /**
   * Subtask delete
   */
  export type SubtaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter which Subtask to delete.
     */
    where: SubtaskWhereUniqueInput
  }

  /**
   * Subtask deleteMany
   */
  export type SubtaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subtasks to delete
     */
    where?: SubtaskWhereInput
    /**
     * Limit how many Subtasks to delete.
     */
    limit?: number
  }

  /**
   * Subtask.delegationRecords
   */
  export type Subtask$delegationRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationRecord
     */
    select?: DelegationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegationRecord
     */
    omit?: DelegationRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationRecordInclude<ExtArgs> | null
    where?: DelegationRecordWhereInput
    orderBy?: DelegationRecordOrderByWithRelationInput | DelegationRecordOrderByWithRelationInput[]
    cursor?: DelegationRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DelegationRecordScalarFieldEnum | DelegationRecordScalarFieldEnum[]
  }

  /**
   * Subtask.comments
   */
  export type Subtask$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Subtask without action
   */
  export type SubtaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
  }


  /**
   * Model DelegationRecord
   */

  export type AggregateDelegationRecord = {
    _count: DelegationRecordCountAggregateOutputType | null
    _avg: DelegationRecordAvgAggregateOutputType | null
    _sum: DelegationRecordSumAggregateOutputType | null
    _min: DelegationRecordMinAggregateOutputType | null
    _max: DelegationRecordMaxAggregateOutputType | null
  }

  export type DelegationRecordAvgAggregateOutputType = {
    id: number | null
    subtaskId: number | null
    redelegationCount: number | null
  }

  export type DelegationRecordSumAggregateOutputType = {
    id: number | null
    subtaskId: number | null
    redelegationCount: number | null
  }

  export type DelegationRecordMinAggregateOutputType = {
    id: number | null
    taskId: string | null
    subtaskId: number | null
    fromMode: string | null
    toMode: string | null
    delegationTimestamp: Date | null
    completionTimestamp: Date | null
    success: boolean | null
    rejectionReason: string | null
    redelegationCount: number | null
  }

  export type DelegationRecordMaxAggregateOutputType = {
    id: number | null
    taskId: string | null
    subtaskId: number | null
    fromMode: string | null
    toMode: string | null
    delegationTimestamp: Date | null
    completionTimestamp: Date | null
    success: boolean | null
    rejectionReason: string | null
    redelegationCount: number | null
  }

  export type DelegationRecordCountAggregateOutputType = {
    id: number
    taskId: number
    subtaskId: number
    fromMode: number
    toMode: number
    delegationTimestamp: number
    completionTimestamp: number
    success: number
    rejectionReason: number
    redelegationCount: number
    _all: number
  }


  export type DelegationRecordAvgAggregateInputType = {
    id?: true
    subtaskId?: true
    redelegationCount?: true
  }

  export type DelegationRecordSumAggregateInputType = {
    id?: true
    subtaskId?: true
    redelegationCount?: true
  }

  export type DelegationRecordMinAggregateInputType = {
    id?: true
    taskId?: true
    subtaskId?: true
    fromMode?: true
    toMode?: true
    delegationTimestamp?: true
    completionTimestamp?: true
    success?: true
    rejectionReason?: true
    redelegationCount?: true
  }

  export type DelegationRecordMaxAggregateInputType = {
    id?: true
    taskId?: true
    subtaskId?: true
    fromMode?: true
    toMode?: true
    delegationTimestamp?: true
    completionTimestamp?: true
    success?: true
    rejectionReason?: true
    redelegationCount?: true
  }

  export type DelegationRecordCountAggregateInputType = {
    id?: true
    taskId?: true
    subtaskId?: true
    fromMode?: true
    toMode?: true
    delegationTimestamp?: true
    completionTimestamp?: true
    success?: true
    rejectionReason?: true
    redelegationCount?: true
    _all?: true
  }

  export type DelegationRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DelegationRecord to aggregate.
     */
    where?: DelegationRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DelegationRecords to fetch.
     */
    orderBy?: DelegationRecordOrderByWithRelationInput | DelegationRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DelegationRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DelegationRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DelegationRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DelegationRecords
    **/
    _count?: true | DelegationRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DelegationRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DelegationRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DelegationRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DelegationRecordMaxAggregateInputType
  }

  export type GetDelegationRecordAggregateType<T extends DelegationRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateDelegationRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDelegationRecord[P]>
      : GetScalarType<T[P], AggregateDelegationRecord[P]>
  }




  export type DelegationRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DelegationRecordWhereInput
    orderBy?: DelegationRecordOrderByWithAggregationInput | DelegationRecordOrderByWithAggregationInput[]
    by: DelegationRecordScalarFieldEnum[] | DelegationRecordScalarFieldEnum
    having?: DelegationRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DelegationRecordCountAggregateInputType | true
    _avg?: DelegationRecordAvgAggregateInputType
    _sum?: DelegationRecordSumAggregateInputType
    _min?: DelegationRecordMinAggregateInputType
    _max?: DelegationRecordMaxAggregateInputType
  }

  export type DelegationRecordGroupByOutputType = {
    id: number
    taskId: string
    subtaskId: number | null
    fromMode: string
    toMode: string
    delegationTimestamp: Date
    completionTimestamp: Date | null
    success: boolean | null
    rejectionReason: string | null
    redelegationCount: number
    _count: DelegationRecordCountAggregateOutputType | null
    _avg: DelegationRecordAvgAggregateOutputType | null
    _sum: DelegationRecordSumAggregateOutputType | null
    _min: DelegationRecordMinAggregateOutputType | null
    _max: DelegationRecordMaxAggregateOutputType | null
  }

  type GetDelegationRecordGroupByPayload<T extends DelegationRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DelegationRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DelegationRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DelegationRecordGroupByOutputType[P]>
            : GetScalarType<T[P], DelegationRecordGroupByOutputType[P]>
        }
      >
    >


  export type DelegationRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    subtaskId?: boolean
    fromMode?: boolean
    toMode?: boolean
    delegationTimestamp?: boolean
    completionTimestamp?: boolean
    success?: boolean
    rejectionReason?: boolean
    redelegationCount?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    subtask?: boolean | DelegationRecord$subtaskArgs<ExtArgs>
  }, ExtArgs["result"]["delegationRecord"]>

  export type DelegationRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    subtaskId?: boolean
    fromMode?: boolean
    toMode?: boolean
    delegationTimestamp?: boolean
    completionTimestamp?: boolean
    success?: boolean
    rejectionReason?: boolean
    redelegationCount?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    subtask?: boolean | DelegationRecord$subtaskArgs<ExtArgs>
  }, ExtArgs["result"]["delegationRecord"]>

  export type DelegationRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    subtaskId?: boolean
    fromMode?: boolean
    toMode?: boolean
    delegationTimestamp?: boolean
    completionTimestamp?: boolean
    success?: boolean
    rejectionReason?: boolean
    redelegationCount?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    subtask?: boolean | DelegationRecord$subtaskArgs<ExtArgs>
  }, ExtArgs["result"]["delegationRecord"]>

  export type DelegationRecordSelectScalar = {
    id?: boolean
    taskId?: boolean
    subtaskId?: boolean
    fromMode?: boolean
    toMode?: boolean
    delegationTimestamp?: boolean
    completionTimestamp?: boolean
    success?: boolean
    rejectionReason?: boolean
    redelegationCount?: boolean
  }

  export type DelegationRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "subtaskId" | "fromMode" | "toMode" | "delegationTimestamp" | "completionTimestamp" | "success" | "rejectionReason" | "redelegationCount", ExtArgs["result"]["delegationRecord"]>
  export type DelegationRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    subtask?: boolean | DelegationRecord$subtaskArgs<ExtArgs>
  }
  export type DelegationRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    subtask?: boolean | DelegationRecord$subtaskArgs<ExtArgs>
  }
  export type DelegationRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    subtask?: boolean | DelegationRecord$subtaskArgs<ExtArgs>
  }

  export type $DelegationRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DelegationRecord"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      subtask: Prisma.$SubtaskPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      taskId: string
      subtaskId: number | null
      fromMode: string
      toMode: string
      delegationTimestamp: Date
      completionTimestamp: Date | null
      success: boolean | null
      rejectionReason: string | null
      redelegationCount: number
    }, ExtArgs["result"]["delegationRecord"]>
    composites: {}
  }

  type DelegationRecordGetPayload<S extends boolean | null | undefined | DelegationRecordDefaultArgs> = $Result.GetResult<Prisma.$DelegationRecordPayload, S>

  type DelegationRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DelegationRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DelegationRecordCountAggregateInputType | true
    }

  export interface DelegationRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DelegationRecord'], meta: { name: 'DelegationRecord' } }
    /**
     * Find zero or one DelegationRecord that matches the filter.
     * @param {DelegationRecordFindUniqueArgs} args - Arguments to find a DelegationRecord
     * @example
     * // Get one DelegationRecord
     * const delegationRecord = await prisma.delegationRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DelegationRecordFindUniqueArgs>(args: SelectSubset<T, DelegationRecordFindUniqueArgs<ExtArgs>>): Prisma__DelegationRecordClient<$Result.GetResult<Prisma.$DelegationRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DelegationRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DelegationRecordFindUniqueOrThrowArgs} args - Arguments to find a DelegationRecord
     * @example
     * // Get one DelegationRecord
     * const delegationRecord = await prisma.delegationRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DelegationRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, DelegationRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DelegationRecordClient<$Result.GetResult<Prisma.$DelegationRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DelegationRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationRecordFindFirstArgs} args - Arguments to find a DelegationRecord
     * @example
     * // Get one DelegationRecord
     * const delegationRecord = await prisma.delegationRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DelegationRecordFindFirstArgs>(args?: SelectSubset<T, DelegationRecordFindFirstArgs<ExtArgs>>): Prisma__DelegationRecordClient<$Result.GetResult<Prisma.$DelegationRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DelegationRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationRecordFindFirstOrThrowArgs} args - Arguments to find a DelegationRecord
     * @example
     * // Get one DelegationRecord
     * const delegationRecord = await prisma.delegationRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DelegationRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, DelegationRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__DelegationRecordClient<$Result.GetResult<Prisma.$DelegationRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DelegationRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DelegationRecords
     * const delegationRecords = await prisma.delegationRecord.findMany()
     * 
     * // Get first 10 DelegationRecords
     * const delegationRecords = await prisma.delegationRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const delegationRecordWithIdOnly = await prisma.delegationRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DelegationRecordFindManyArgs>(args?: SelectSubset<T, DelegationRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegationRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DelegationRecord.
     * @param {DelegationRecordCreateArgs} args - Arguments to create a DelegationRecord.
     * @example
     * // Create one DelegationRecord
     * const DelegationRecord = await prisma.delegationRecord.create({
     *   data: {
     *     // ... data to create a DelegationRecord
     *   }
     * })
     * 
     */
    create<T extends DelegationRecordCreateArgs>(args: SelectSubset<T, DelegationRecordCreateArgs<ExtArgs>>): Prisma__DelegationRecordClient<$Result.GetResult<Prisma.$DelegationRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DelegationRecords.
     * @param {DelegationRecordCreateManyArgs} args - Arguments to create many DelegationRecords.
     * @example
     * // Create many DelegationRecords
     * const delegationRecord = await prisma.delegationRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DelegationRecordCreateManyArgs>(args?: SelectSubset<T, DelegationRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DelegationRecords and returns the data saved in the database.
     * @param {DelegationRecordCreateManyAndReturnArgs} args - Arguments to create many DelegationRecords.
     * @example
     * // Create many DelegationRecords
     * const delegationRecord = await prisma.delegationRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DelegationRecords and only return the `id`
     * const delegationRecordWithIdOnly = await prisma.delegationRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DelegationRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, DelegationRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegationRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DelegationRecord.
     * @param {DelegationRecordDeleteArgs} args - Arguments to delete one DelegationRecord.
     * @example
     * // Delete one DelegationRecord
     * const DelegationRecord = await prisma.delegationRecord.delete({
     *   where: {
     *     // ... filter to delete one DelegationRecord
     *   }
     * })
     * 
     */
    delete<T extends DelegationRecordDeleteArgs>(args: SelectSubset<T, DelegationRecordDeleteArgs<ExtArgs>>): Prisma__DelegationRecordClient<$Result.GetResult<Prisma.$DelegationRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DelegationRecord.
     * @param {DelegationRecordUpdateArgs} args - Arguments to update one DelegationRecord.
     * @example
     * // Update one DelegationRecord
     * const delegationRecord = await prisma.delegationRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DelegationRecordUpdateArgs>(args: SelectSubset<T, DelegationRecordUpdateArgs<ExtArgs>>): Prisma__DelegationRecordClient<$Result.GetResult<Prisma.$DelegationRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DelegationRecords.
     * @param {DelegationRecordDeleteManyArgs} args - Arguments to filter DelegationRecords to delete.
     * @example
     * // Delete a few DelegationRecords
     * const { count } = await prisma.delegationRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DelegationRecordDeleteManyArgs>(args?: SelectSubset<T, DelegationRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DelegationRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DelegationRecords
     * const delegationRecord = await prisma.delegationRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DelegationRecordUpdateManyArgs>(args: SelectSubset<T, DelegationRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DelegationRecords and returns the data updated in the database.
     * @param {DelegationRecordUpdateManyAndReturnArgs} args - Arguments to update many DelegationRecords.
     * @example
     * // Update many DelegationRecords
     * const delegationRecord = await prisma.delegationRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DelegationRecords and only return the `id`
     * const delegationRecordWithIdOnly = await prisma.delegationRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DelegationRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, DelegationRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegationRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DelegationRecord.
     * @param {DelegationRecordUpsertArgs} args - Arguments to update or create a DelegationRecord.
     * @example
     * // Update or create a DelegationRecord
     * const delegationRecord = await prisma.delegationRecord.upsert({
     *   create: {
     *     // ... data to create a DelegationRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DelegationRecord we want to update
     *   }
     * })
     */
    upsert<T extends DelegationRecordUpsertArgs>(args: SelectSubset<T, DelegationRecordUpsertArgs<ExtArgs>>): Prisma__DelegationRecordClient<$Result.GetResult<Prisma.$DelegationRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DelegationRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationRecordCountArgs} args - Arguments to filter DelegationRecords to count.
     * @example
     * // Count the number of DelegationRecords
     * const count = await prisma.delegationRecord.count({
     *   where: {
     *     // ... the filter for the DelegationRecords we want to count
     *   }
     * })
    **/
    count<T extends DelegationRecordCountArgs>(
      args?: Subset<T, DelegationRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DelegationRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DelegationRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DelegationRecordAggregateArgs>(args: Subset<T, DelegationRecordAggregateArgs>): Prisma.PrismaPromise<GetDelegationRecordAggregateType<T>>

    /**
     * Group by DelegationRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DelegationRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DelegationRecordGroupByArgs['orderBy'] }
        : { orderBy?: DelegationRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DelegationRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDelegationRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DelegationRecord model
   */
  readonly fields: DelegationRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DelegationRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DelegationRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subtask<T extends DelegationRecord$subtaskArgs<ExtArgs> = {}>(args?: Subset<T, DelegationRecord$subtaskArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DelegationRecord model
   */
  interface DelegationRecordFieldRefs {
    readonly id: FieldRef<"DelegationRecord", 'Int'>
    readonly taskId: FieldRef<"DelegationRecord", 'String'>
    readonly subtaskId: FieldRef<"DelegationRecord", 'Int'>
    readonly fromMode: FieldRef<"DelegationRecord", 'String'>
    readonly toMode: FieldRef<"DelegationRecord", 'String'>
    readonly delegationTimestamp: FieldRef<"DelegationRecord", 'DateTime'>
    readonly completionTimestamp: FieldRef<"DelegationRecord", 'DateTime'>
    readonly success: FieldRef<"DelegationRecord", 'Boolean'>
    readonly rejectionReason: FieldRef<"DelegationRecord", 'String'>
    readonly redelegationCount: FieldRef<"DelegationRecord", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * DelegationRecord findUnique
   */
  export type DelegationRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationRecord
     */
    select?: DelegationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegationRecord
     */
    omit?: DelegationRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationRecordInclude<ExtArgs> | null
    /**
     * Filter, which DelegationRecord to fetch.
     */
    where: DelegationRecordWhereUniqueInput
  }

  /**
   * DelegationRecord findUniqueOrThrow
   */
  export type DelegationRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationRecord
     */
    select?: DelegationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegationRecord
     */
    omit?: DelegationRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationRecordInclude<ExtArgs> | null
    /**
     * Filter, which DelegationRecord to fetch.
     */
    where: DelegationRecordWhereUniqueInput
  }

  /**
   * DelegationRecord findFirst
   */
  export type DelegationRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationRecord
     */
    select?: DelegationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegationRecord
     */
    omit?: DelegationRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationRecordInclude<ExtArgs> | null
    /**
     * Filter, which DelegationRecord to fetch.
     */
    where?: DelegationRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DelegationRecords to fetch.
     */
    orderBy?: DelegationRecordOrderByWithRelationInput | DelegationRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DelegationRecords.
     */
    cursor?: DelegationRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DelegationRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DelegationRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DelegationRecords.
     */
    distinct?: DelegationRecordScalarFieldEnum | DelegationRecordScalarFieldEnum[]
  }

  /**
   * DelegationRecord findFirstOrThrow
   */
  export type DelegationRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationRecord
     */
    select?: DelegationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegationRecord
     */
    omit?: DelegationRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationRecordInclude<ExtArgs> | null
    /**
     * Filter, which DelegationRecord to fetch.
     */
    where?: DelegationRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DelegationRecords to fetch.
     */
    orderBy?: DelegationRecordOrderByWithRelationInput | DelegationRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DelegationRecords.
     */
    cursor?: DelegationRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DelegationRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DelegationRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DelegationRecords.
     */
    distinct?: DelegationRecordScalarFieldEnum | DelegationRecordScalarFieldEnum[]
  }

  /**
   * DelegationRecord findMany
   */
  export type DelegationRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationRecord
     */
    select?: DelegationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegationRecord
     */
    omit?: DelegationRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationRecordInclude<ExtArgs> | null
    /**
     * Filter, which DelegationRecords to fetch.
     */
    where?: DelegationRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DelegationRecords to fetch.
     */
    orderBy?: DelegationRecordOrderByWithRelationInput | DelegationRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DelegationRecords.
     */
    cursor?: DelegationRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DelegationRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DelegationRecords.
     */
    skip?: number
    distinct?: DelegationRecordScalarFieldEnum | DelegationRecordScalarFieldEnum[]
  }

  /**
   * DelegationRecord create
   */
  export type DelegationRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationRecord
     */
    select?: DelegationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegationRecord
     */
    omit?: DelegationRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a DelegationRecord.
     */
    data: XOR<DelegationRecordCreateInput, DelegationRecordUncheckedCreateInput>
  }

  /**
   * DelegationRecord createMany
   */
  export type DelegationRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DelegationRecords.
     */
    data: DelegationRecordCreateManyInput | DelegationRecordCreateManyInput[]
  }

  /**
   * DelegationRecord createManyAndReturn
   */
  export type DelegationRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationRecord
     */
    select?: DelegationRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DelegationRecord
     */
    omit?: DelegationRecordOmit<ExtArgs> | null
    /**
     * The data used to create many DelegationRecords.
     */
    data: DelegationRecordCreateManyInput | DelegationRecordCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DelegationRecord update
   */
  export type DelegationRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationRecord
     */
    select?: DelegationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegationRecord
     */
    omit?: DelegationRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a DelegationRecord.
     */
    data: XOR<DelegationRecordUpdateInput, DelegationRecordUncheckedUpdateInput>
    /**
     * Choose, which DelegationRecord to update.
     */
    where: DelegationRecordWhereUniqueInput
  }

  /**
   * DelegationRecord updateMany
   */
  export type DelegationRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DelegationRecords.
     */
    data: XOR<DelegationRecordUpdateManyMutationInput, DelegationRecordUncheckedUpdateManyInput>
    /**
     * Filter which DelegationRecords to update
     */
    where?: DelegationRecordWhereInput
    /**
     * Limit how many DelegationRecords to update.
     */
    limit?: number
  }

  /**
   * DelegationRecord updateManyAndReturn
   */
  export type DelegationRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationRecord
     */
    select?: DelegationRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DelegationRecord
     */
    omit?: DelegationRecordOmit<ExtArgs> | null
    /**
     * The data used to update DelegationRecords.
     */
    data: XOR<DelegationRecordUpdateManyMutationInput, DelegationRecordUncheckedUpdateManyInput>
    /**
     * Filter which DelegationRecords to update
     */
    where?: DelegationRecordWhereInput
    /**
     * Limit how many DelegationRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DelegationRecord upsert
   */
  export type DelegationRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationRecord
     */
    select?: DelegationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegationRecord
     */
    omit?: DelegationRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the DelegationRecord to update in case it exists.
     */
    where: DelegationRecordWhereUniqueInput
    /**
     * In case the DelegationRecord found by the `where` argument doesn't exist, create a new DelegationRecord with this data.
     */
    create: XOR<DelegationRecordCreateInput, DelegationRecordUncheckedCreateInput>
    /**
     * In case the DelegationRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DelegationRecordUpdateInput, DelegationRecordUncheckedUpdateInput>
  }

  /**
   * DelegationRecord delete
   */
  export type DelegationRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationRecord
     */
    select?: DelegationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegationRecord
     */
    omit?: DelegationRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationRecordInclude<ExtArgs> | null
    /**
     * Filter which DelegationRecord to delete.
     */
    where: DelegationRecordWhereUniqueInput
  }

  /**
   * DelegationRecord deleteMany
   */
  export type DelegationRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DelegationRecords to delete
     */
    where?: DelegationRecordWhereInput
    /**
     * Limit how many DelegationRecords to delete.
     */
    limit?: number
  }

  /**
   * DelegationRecord.subtask
   */
  export type DelegationRecord$subtaskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    where?: SubtaskWhereInput
  }

  /**
   * DelegationRecord without action
   */
  export type DelegationRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationRecord
     */
    select?: DelegationRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DelegationRecord
     */
    omit?: DelegationRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationRecordInclude<ExtArgs> | null
  }


  /**
   * Model ResearchReport
   */

  export type AggregateResearchReport = {
    _count: ResearchReportCountAggregateOutputType | null
    _avg: ResearchReportAvgAggregateOutputType | null
    _sum: ResearchReportSumAggregateOutputType | null
    _min: ResearchReportMinAggregateOutputType | null
    _max: ResearchReportMaxAggregateOutputType | null
  }

  export type ResearchReportAvgAggregateOutputType = {
    id: number | null
  }

  export type ResearchReportSumAggregateOutputType = {
    id: number | null
  }

  export type ResearchReportMinAggregateOutputType = {
    id: number | null
    taskId: string | null
    title: string | null
    summary: string | null
    findings: string | null
    recommendations: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResearchReportMaxAggregateOutputType = {
    id: number | null
    taskId: string | null
    title: string | null
    summary: string | null
    findings: string | null
    recommendations: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResearchReportCountAggregateOutputType = {
    id: number
    taskId: number
    title: number
    summary: number
    findings: number
    recommendations: number
    references: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ResearchReportAvgAggregateInputType = {
    id?: true
  }

  export type ResearchReportSumAggregateInputType = {
    id?: true
  }

  export type ResearchReportMinAggregateInputType = {
    id?: true
    taskId?: true
    title?: true
    summary?: true
    findings?: true
    recommendations?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResearchReportMaxAggregateInputType = {
    id?: true
    taskId?: true
    title?: true
    summary?: true
    findings?: true
    recommendations?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResearchReportCountAggregateInputType = {
    id?: true
    taskId?: true
    title?: true
    summary?: true
    findings?: true
    recommendations?: true
    references?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ResearchReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResearchReport to aggregate.
     */
    where?: ResearchReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResearchReports to fetch.
     */
    orderBy?: ResearchReportOrderByWithRelationInput | ResearchReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResearchReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResearchReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResearchReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResearchReports
    **/
    _count?: true | ResearchReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResearchReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResearchReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResearchReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResearchReportMaxAggregateInputType
  }

  export type GetResearchReportAggregateType<T extends ResearchReportAggregateArgs> = {
        [P in keyof T & keyof AggregateResearchReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResearchReport[P]>
      : GetScalarType<T[P], AggregateResearchReport[P]>
  }




  export type ResearchReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResearchReportWhereInput
    orderBy?: ResearchReportOrderByWithAggregationInput | ResearchReportOrderByWithAggregationInput[]
    by: ResearchReportScalarFieldEnum[] | ResearchReportScalarFieldEnum
    having?: ResearchReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResearchReportCountAggregateInputType | true
    _avg?: ResearchReportAvgAggregateInputType
    _sum?: ResearchReportSumAggregateInputType
    _min?: ResearchReportMinAggregateInputType
    _max?: ResearchReportMaxAggregateInputType
  }

  export type ResearchReportGroupByOutputType = {
    id: number
    taskId: string
    title: string
    summary: string
    findings: string
    recommendations: string
    references: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: ResearchReportCountAggregateOutputType | null
    _avg: ResearchReportAvgAggregateOutputType | null
    _sum: ResearchReportSumAggregateOutputType | null
    _min: ResearchReportMinAggregateOutputType | null
    _max: ResearchReportMaxAggregateOutputType | null
  }

  type GetResearchReportGroupByPayload<T extends ResearchReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResearchReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResearchReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResearchReportGroupByOutputType[P]>
            : GetScalarType<T[P], ResearchReportGroupByOutputType[P]>
        }
      >
    >


  export type ResearchReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    title?: boolean
    summary?: boolean
    findings?: boolean
    recommendations?: boolean
    references?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["researchReport"]>

  export type ResearchReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    title?: boolean
    summary?: boolean
    findings?: boolean
    recommendations?: boolean
    references?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["researchReport"]>

  export type ResearchReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    title?: boolean
    summary?: boolean
    findings?: boolean
    recommendations?: boolean
    references?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["researchReport"]>

  export type ResearchReportSelectScalar = {
    id?: boolean
    taskId?: boolean
    title?: boolean
    summary?: boolean
    findings?: boolean
    recommendations?: boolean
    references?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ResearchReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "title" | "summary" | "findings" | "recommendations" | "references" | "createdAt" | "updatedAt", ExtArgs["result"]["researchReport"]>
  export type ResearchReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type ResearchReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type ResearchReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }

  export type $ResearchReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResearchReport"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      taskId: string
      title: string
      summary: string
      findings: string
      recommendations: string
      references: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["researchReport"]>
    composites: {}
  }

  type ResearchReportGetPayload<S extends boolean | null | undefined | ResearchReportDefaultArgs> = $Result.GetResult<Prisma.$ResearchReportPayload, S>

  type ResearchReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResearchReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResearchReportCountAggregateInputType | true
    }

  export interface ResearchReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResearchReport'], meta: { name: 'ResearchReport' } }
    /**
     * Find zero or one ResearchReport that matches the filter.
     * @param {ResearchReportFindUniqueArgs} args - Arguments to find a ResearchReport
     * @example
     * // Get one ResearchReport
     * const researchReport = await prisma.researchReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResearchReportFindUniqueArgs>(args: SelectSubset<T, ResearchReportFindUniqueArgs<ExtArgs>>): Prisma__ResearchReportClient<$Result.GetResult<Prisma.$ResearchReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResearchReport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResearchReportFindUniqueOrThrowArgs} args - Arguments to find a ResearchReport
     * @example
     * // Get one ResearchReport
     * const researchReport = await prisma.researchReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResearchReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ResearchReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResearchReportClient<$Result.GetResult<Prisma.$ResearchReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResearchReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchReportFindFirstArgs} args - Arguments to find a ResearchReport
     * @example
     * // Get one ResearchReport
     * const researchReport = await prisma.researchReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResearchReportFindFirstArgs>(args?: SelectSubset<T, ResearchReportFindFirstArgs<ExtArgs>>): Prisma__ResearchReportClient<$Result.GetResult<Prisma.$ResearchReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResearchReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchReportFindFirstOrThrowArgs} args - Arguments to find a ResearchReport
     * @example
     * // Get one ResearchReport
     * const researchReport = await prisma.researchReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResearchReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ResearchReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResearchReportClient<$Result.GetResult<Prisma.$ResearchReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResearchReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResearchReports
     * const researchReports = await prisma.researchReport.findMany()
     * 
     * // Get first 10 ResearchReports
     * const researchReports = await prisma.researchReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const researchReportWithIdOnly = await prisma.researchReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResearchReportFindManyArgs>(args?: SelectSubset<T, ResearchReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResearchReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResearchReport.
     * @param {ResearchReportCreateArgs} args - Arguments to create a ResearchReport.
     * @example
     * // Create one ResearchReport
     * const ResearchReport = await prisma.researchReport.create({
     *   data: {
     *     // ... data to create a ResearchReport
     *   }
     * })
     * 
     */
    create<T extends ResearchReportCreateArgs>(args: SelectSubset<T, ResearchReportCreateArgs<ExtArgs>>): Prisma__ResearchReportClient<$Result.GetResult<Prisma.$ResearchReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResearchReports.
     * @param {ResearchReportCreateManyArgs} args - Arguments to create many ResearchReports.
     * @example
     * // Create many ResearchReports
     * const researchReport = await prisma.researchReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResearchReportCreateManyArgs>(args?: SelectSubset<T, ResearchReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResearchReports and returns the data saved in the database.
     * @param {ResearchReportCreateManyAndReturnArgs} args - Arguments to create many ResearchReports.
     * @example
     * // Create many ResearchReports
     * const researchReport = await prisma.researchReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResearchReports and only return the `id`
     * const researchReportWithIdOnly = await prisma.researchReport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResearchReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ResearchReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResearchReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ResearchReport.
     * @param {ResearchReportDeleteArgs} args - Arguments to delete one ResearchReport.
     * @example
     * // Delete one ResearchReport
     * const ResearchReport = await prisma.researchReport.delete({
     *   where: {
     *     // ... filter to delete one ResearchReport
     *   }
     * })
     * 
     */
    delete<T extends ResearchReportDeleteArgs>(args: SelectSubset<T, ResearchReportDeleteArgs<ExtArgs>>): Prisma__ResearchReportClient<$Result.GetResult<Prisma.$ResearchReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResearchReport.
     * @param {ResearchReportUpdateArgs} args - Arguments to update one ResearchReport.
     * @example
     * // Update one ResearchReport
     * const researchReport = await prisma.researchReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResearchReportUpdateArgs>(args: SelectSubset<T, ResearchReportUpdateArgs<ExtArgs>>): Prisma__ResearchReportClient<$Result.GetResult<Prisma.$ResearchReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResearchReports.
     * @param {ResearchReportDeleteManyArgs} args - Arguments to filter ResearchReports to delete.
     * @example
     * // Delete a few ResearchReports
     * const { count } = await prisma.researchReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResearchReportDeleteManyArgs>(args?: SelectSubset<T, ResearchReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResearchReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResearchReports
     * const researchReport = await prisma.researchReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResearchReportUpdateManyArgs>(args: SelectSubset<T, ResearchReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResearchReports and returns the data updated in the database.
     * @param {ResearchReportUpdateManyAndReturnArgs} args - Arguments to update many ResearchReports.
     * @example
     * // Update many ResearchReports
     * const researchReport = await prisma.researchReport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResearchReports and only return the `id`
     * const researchReportWithIdOnly = await prisma.researchReport.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResearchReportUpdateManyAndReturnArgs>(args: SelectSubset<T, ResearchReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResearchReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ResearchReport.
     * @param {ResearchReportUpsertArgs} args - Arguments to update or create a ResearchReport.
     * @example
     * // Update or create a ResearchReport
     * const researchReport = await prisma.researchReport.upsert({
     *   create: {
     *     // ... data to create a ResearchReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResearchReport we want to update
     *   }
     * })
     */
    upsert<T extends ResearchReportUpsertArgs>(args: SelectSubset<T, ResearchReportUpsertArgs<ExtArgs>>): Prisma__ResearchReportClient<$Result.GetResult<Prisma.$ResearchReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResearchReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchReportCountArgs} args - Arguments to filter ResearchReports to count.
     * @example
     * // Count the number of ResearchReports
     * const count = await prisma.researchReport.count({
     *   where: {
     *     // ... the filter for the ResearchReports we want to count
     *   }
     * })
    **/
    count<T extends ResearchReportCountArgs>(
      args?: Subset<T, ResearchReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResearchReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResearchReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResearchReportAggregateArgs>(args: Subset<T, ResearchReportAggregateArgs>): Prisma.PrismaPromise<GetResearchReportAggregateType<T>>

    /**
     * Group by ResearchReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResearchReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResearchReportGroupByArgs['orderBy'] }
        : { orderBy?: ResearchReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResearchReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResearchReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResearchReport model
   */
  readonly fields: ResearchReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResearchReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResearchReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResearchReport model
   */
  interface ResearchReportFieldRefs {
    readonly id: FieldRef<"ResearchReport", 'Int'>
    readonly taskId: FieldRef<"ResearchReport", 'String'>
    readonly title: FieldRef<"ResearchReport", 'String'>
    readonly summary: FieldRef<"ResearchReport", 'String'>
    readonly findings: FieldRef<"ResearchReport", 'String'>
    readonly recommendations: FieldRef<"ResearchReport", 'String'>
    readonly references: FieldRef<"ResearchReport", 'Json'>
    readonly createdAt: FieldRef<"ResearchReport", 'DateTime'>
    readonly updatedAt: FieldRef<"ResearchReport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ResearchReport findUnique
   */
  export type ResearchReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchReport
     */
    select?: ResearchReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchReport
     */
    omit?: ResearchReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchReportInclude<ExtArgs> | null
    /**
     * Filter, which ResearchReport to fetch.
     */
    where: ResearchReportWhereUniqueInput
  }

  /**
   * ResearchReport findUniqueOrThrow
   */
  export type ResearchReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchReport
     */
    select?: ResearchReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchReport
     */
    omit?: ResearchReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchReportInclude<ExtArgs> | null
    /**
     * Filter, which ResearchReport to fetch.
     */
    where: ResearchReportWhereUniqueInput
  }

  /**
   * ResearchReport findFirst
   */
  export type ResearchReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchReport
     */
    select?: ResearchReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchReport
     */
    omit?: ResearchReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchReportInclude<ExtArgs> | null
    /**
     * Filter, which ResearchReport to fetch.
     */
    where?: ResearchReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResearchReports to fetch.
     */
    orderBy?: ResearchReportOrderByWithRelationInput | ResearchReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResearchReports.
     */
    cursor?: ResearchReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResearchReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResearchReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResearchReports.
     */
    distinct?: ResearchReportScalarFieldEnum | ResearchReportScalarFieldEnum[]
  }

  /**
   * ResearchReport findFirstOrThrow
   */
  export type ResearchReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchReport
     */
    select?: ResearchReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchReport
     */
    omit?: ResearchReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchReportInclude<ExtArgs> | null
    /**
     * Filter, which ResearchReport to fetch.
     */
    where?: ResearchReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResearchReports to fetch.
     */
    orderBy?: ResearchReportOrderByWithRelationInput | ResearchReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResearchReports.
     */
    cursor?: ResearchReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResearchReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResearchReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResearchReports.
     */
    distinct?: ResearchReportScalarFieldEnum | ResearchReportScalarFieldEnum[]
  }

  /**
   * ResearchReport findMany
   */
  export type ResearchReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchReport
     */
    select?: ResearchReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchReport
     */
    omit?: ResearchReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchReportInclude<ExtArgs> | null
    /**
     * Filter, which ResearchReports to fetch.
     */
    where?: ResearchReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResearchReports to fetch.
     */
    orderBy?: ResearchReportOrderByWithRelationInput | ResearchReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResearchReports.
     */
    cursor?: ResearchReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResearchReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResearchReports.
     */
    skip?: number
    distinct?: ResearchReportScalarFieldEnum | ResearchReportScalarFieldEnum[]
  }

  /**
   * ResearchReport create
   */
  export type ResearchReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchReport
     */
    select?: ResearchReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchReport
     */
    omit?: ResearchReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchReportInclude<ExtArgs> | null
    /**
     * The data needed to create a ResearchReport.
     */
    data: XOR<ResearchReportCreateInput, ResearchReportUncheckedCreateInput>
  }

  /**
   * ResearchReport createMany
   */
  export type ResearchReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResearchReports.
     */
    data: ResearchReportCreateManyInput | ResearchReportCreateManyInput[]
  }

  /**
   * ResearchReport createManyAndReturn
   */
  export type ResearchReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchReport
     */
    select?: ResearchReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchReport
     */
    omit?: ResearchReportOmit<ExtArgs> | null
    /**
     * The data used to create many ResearchReports.
     */
    data: ResearchReportCreateManyInput | ResearchReportCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResearchReport update
   */
  export type ResearchReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchReport
     */
    select?: ResearchReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchReport
     */
    omit?: ResearchReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchReportInclude<ExtArgs> | null
    /**
     * The data needed to update a ResearchReport.
     */
    data: XOR<ResearchReportUpdateInput, ResearchReportUncheckedUpdateInput>
    /**
     * Choose, which ResearchReport to update.
     */
    where: ResearchReportWhereUniqueInput
  }

  /**
   * ResearchReport updateMany
   */
  export type ResearchReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResearchReports.
     */
    data: XOR<ResearchReportUpdateManyMutationInput, ResearchReportUncheckedUpdateManyInput>
    /**
     * Filter which ResearchReports to update
     */
    where?: ResearchReportWhereInput
    /**
     * Limit how many ResearchReports to update.
     */
    limit?: number
  }

  /**
   * ResearchReport updateManyAndReturn
   */
  export type ResearchReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchReport
     */
    select?: ResearchReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchReport
     */
    omit?: ResearchReportOmit<ExtArgs> | null
    /**
     * The data used to update ResearchReports.
     */
    data: XOR<ResearchReportUpdateManyMutationInput, ResearchReportUncheckedUpdateManyInput>
    /**
     * Filter which ResearchReports to update
     */
    where?: ResearchReportWhereInput
    /**
     * Limit how many ResearchReports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResearchReport upsert
   */
  export type ResearchReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchReport
     */
    select?: ResearchReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchReport
     */
    omit?: ResearchReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchReportInclude<ExtArgs> | null
    /**
     * The filter to search for the ResearchReport to update in case it exists.
     */
    where: ResearchReportWhereUniqueInput
    /**
     * In case the ResearchReport found by the `where` argument doesn't exist, create a new ResearchReport with this data.
     */
    create: XOR<ResearchReportCreateInput, ResearchReportUncheckedCreateInput>
    /**
     * In case the ResearchReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResearchReportUpdateInput, ResearchReportUncheckedUpdateInput>
  }

  /**
   * ResearchReport delete
   */
  export type ResearchReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchReport
     */
    select?: ResearchReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchReport
     */
    omit?: ResearchReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchReportInclude<ExtArgs> | null
    /**
     * Filter which ResearchReport to delete.
     */
    where: ResearchReportWhereUniqueInput
  }

  /**
   * ResearchReport deleteMany
   */
  export type ResearchReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResearchReports to delete
     */
    where?: ResearchReportWhereInput
    /**
     * Limit how many ResearchReports to delete.
     */
    limit?: number
  }

  /**
   * ResearchReport without action
   */
  export type ResearchReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchReport
     */
    select?: ResearchReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchReport
     */
    omit?: ResearchReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchReportInclude<ExtArgs> | null
  }


  /**
   * Model CodeReview
   */

  export type AggregateCodeReview = {
    _count: CodeReviewCountAggregateOutputType | null
    _avg: CodeReviewAvgAggregateOutputType | null
    _sum: CodeReviewSumAggregateOutputType | null
    _min: CodeReviewMinAggregateOutputType | null
    _max: CodeReviewMaxAggregateOutputType | null
  }

  export type CodeReviewAvgAggregateOutputType = {
    id: number | null
  }

  export type CodeReviewSumAggregateOutputType = {
    id: number | null
  }

  export type CodeReviewMinAggregateOutputType = {
    id: number | null
    taskId: string | null
    status: string | null
    summary: string | null
    strengths: string | null
    issues: string | null
    manualTestingResults: string | null
    requiredChanges: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CodeReviewMaxAggregateOutputType = {
    id: number | null
    taskId: string | null
    status: string | null
    summary: string | null
    strengths: string | null
    issues: string | null
    manualTestingResults: string | null
    requiredChanges: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CodeReviewCountAggregateOutputType = {
    id: number
    taskId: number
    status: number
    summary: number
    strengths: number
    issues: number
    acceptanceCriteriaVerification: number
    manualTestingResults: number
    requiredChanges: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CodeReviewAvgAggregateInputType = {
    id?: true
  }

  export type CodeReviewSumAggregateInputType = {
    id?: true
  }

  export type CodeReviewMinAggregateInputType = {
    id?: true
    taskId?: true
    status?: true
    summary?: true
    strengths?: true
    issues?: true
    manualTestingResults?: true
    requiredChanges?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CodeReviewMaxAggregateInputType = {
    id?: true
    taskId?: true
    status?: true
    summary?: true
    strengths?: true
    issues?: true
    manualTestingResults?: true
    requiredChanges?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CodeReviewCountAggregateInputType = {
    id?: true
    taskId?: true
    status?: true
    summary?: true
    strengths?: true
    issues?: true
    acceptanceCriteriaVerification?: true
    manualTestingResults?: true
    requiredChanges?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CodeReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CodeReview to aggregate.
     */
    where?: CodeReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodeReviews to fetch.
     */
    orderBy?: CodeReviewOrderByWithRelationInput | CodeReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CodeReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodeReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodeReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CodeReviews
    **/
    _count?: true | CodeReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CodeReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CodeReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CodeReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CodeReviewMaxAggregateInputType
  }

  export type GetCodeReviewAggregateType<T extends CodeReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateCodeReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCodeReview[P]>
      : GetScalarType<T[P], AggregateCodeReview[P]>
  }




  export type CodeReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CodeReviewWhereInput
    orderBy?: CodeReviewOrderByWithAggregationInput | CodeReviewOrderByWithAggregationInput[]
    by: CodeReviewScalarFieldEnum[] | CodeReviewScalarFieldEnum
    having?: CodeReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CodeReviewCountAggregateInputType | true
    _avg?: CodeReviewAvgAggregateInputType
    _sum?: CodeReviewSumAggregateInputType
    _min?: CodeReviewMinAggregateInputType
    _max?: CodeReviewMaxAggregateInputType
  }

  export type CodeReviewGroupByOutputType = {
    id: number
    taskId: string
    status: string
    summary: string
    strengths: string
    issues: string
    acceptanceCriteriaVerification: JsonValue
    manualTestingResults: string
    requiredChanges: string | null
    createdAt: Date
    updatedAt: Date
    _count: CodeReviewCountAggregateOutputType | null
    _avg: CodeReviewAvgAggregateOutputType | null
    _sum: CodeReviewSumAggregateOutputType | null
    _min: CodeReviewMinAggregateOutputType | null
    _max: CodeReviewMaxAggregateOutputType | null
  }

  type GetCodeReviewGroupByPayload<T extends CodeReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CodeReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CodeReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CodeReviewGroupByOutputType[P]>
            : GetScalarType<T[P], CodeReviewGroupByOutputType[P]>
        }
      >
    >


  export type CodeReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    status?: boolean
    summary?: boolean
    strengths?: boolean
    issues?: boolean
    acceptanceCriteriaVerification?: boolean
    manualTestingResults?: boolean
    requiredChanges?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["codeReview"]>

  export type CodeReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    status?: boolean
    summary?: boolean
    strengths?: boolean
    issues?: boolean
    acceptanceCriteriaVerification?: boolean
    manualTestingResults?: boolean
    requiredChanges?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["codeReview"]>

  export type CodeReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    status?: boolean
    summary?: boolean
    strengths?: boolean
    issues?: boolean
    acceptanceCriteriaVerification?: boolean
    manualTestingResults?: boolean
    requiredChanges?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["codeReview"]>

  export type CodeReviewSelectScalar = {
    id?: boolean
    taskId?: boolean
    status?: boolean
    summary?: boolean
    strengths?: boolean
    issues?: boolean
    acceptanceCriteriaVerification?: boolean
    manualTestingResults?: boolean
    requiredChanges?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CodeReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "status" | "summary" | "strengths" | "issues" | "acceptanceCriteriaVerification" | "manualTestingResults" | "requiredChanges" | "createdAt" | "updatedAt", ExtArgs["result"]["codeReview"]>
  export type CodeReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type CodeReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type CodeReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }

  export type $CodeReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CodeReview"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      taskId: string
      status: string
      summary: string
      strengths: string
      issues: string
      acceptanceCriteriaVerification: Prisma.JsonValue
      manualTestingResults: string
      requiredChanges: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["codeReview"]>
    composites: {}
  }

  type CodeReviewGetPayload<S extends boolean | null | undefined | CodeReviewDefaultArgs> = $Result.GetResult<Prisma.$CodeReviewPayload, S>

  type CodeReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CodeReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CodeReviewCountAggregateInputType | true
    }

  export interface CodeReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CodeReview'], meta: { name: 'CodeReview' } }
    /**
     * Find zero or one CodeReview that matches the filter.
     * @param {CodeReviewFindUniqueArgs} args - Arguments to find a CodeReview
     * @example
     * // Get one CodeReview
     * const codeReview = await prisma.codeReview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CodeReviewFindUniqueArgs>(args: SelectSubset<T, CodeReviewFindUniqueArgs<ExtArgs>>): Prisma__CodeReviewClient<$Result.GetResult<Prisma.$CodeReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CodeReview that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CodeReviewFindUniqueOrThrowArgs} args - Arguments to find a CodeReview
     * @example
     * // Get one CodeReview
     * const codeReview = await prisma.codeReview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CodeReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, CodeReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CodeReviewClient<$Result.GetResult<Prisma.$CodeReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CodeReview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeReviewFindFirstArgs} args - Arguments to find a CodeReview
     * @example
     * // Get one CodeReview
     * const codeReview = await prisma.codeReview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CodeReviewFindFirstArgs>(args?: SelectSubset<T, CodeReviewFindFirstArgs<ExtArgs>>): Prisma__CodeReviewClient<$Result.GetResult<Prisma.$CodeReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CodeReview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeReviewFindFirstOrThrowArgs} args - Arguments to find a CodeReview
     * @example
     * // Get one CodeReview
     * const codeReview = await prisma.codeReview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CodeReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, CodeReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__CodeReviewClient<$Result.GetResult<Prisma.$CodeReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CodeReviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CodeReviews
     * const codeReviews = await prisma.codeReview.findMany()
     * 
     * // Get first 10 CodeReviews
     * const codeReviews = await prisma.codeReview.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const codeReviewWithIdOnly = await prisma.codeReview.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CodeReviewFindManyArgs>(args?: SelectSubset<T, CodeReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodeReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CodeReview.
     * @param {CodeReviewCreateArgs} args - Arguments to create a CodeReview.
     * @example
     * // Create one CodeReview
     * const CodeReview = await prisma.codeReview.create({
     *   data: {
     *     // ... data to create a CodeReview
     *   }
     * })
     * 
     */
    create<T extends CodeReviewCreateArgs>(args: SelectSubset<T, CodeReviewCreateArgs<ExtArgs>>): Prisma__CodeReviewClient<$Result.GetResult<Prisma.$CodeReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CodeReviews.
     * @param {CodeReviewCreateManyArgs} args - Arguments to create many CodeReviews.
     * @example
     * // Create many CodeReviews
     * const codeReview = await prisma.codeReview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CodeReviewCreateManyArgs>(args?: SelectSubset<T, CodeReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CodeReviews and returns the data saved in the database.
     * @param {CodeReviewCreateManyAndReturnArgs} args - Arguments to create many CodeReviews.
     * @example
     * // Create many CodeReviews
     * const codeReview = await prisma.codeReview.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CodeReviews and only return the `id`
     * const codeReviewWithIdOnly = await prisma.codeReview.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CodeReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, CodeReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodeReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CodeReview.
     * @param {CodeReviewDeleteArgs} args - Arguments to delete one CodeReview.
     * @example
     * // Delete one CodeReview
     * const CodeReview = await prisma.codeReview.delete({
     *   where: {
     *     // ... filter to delete one CodeReview
     *   }
     * })
     * 
     */
    delete<T extends CodeReviewDeleteArgs>(args: SelectSubset<T, CodeReviewDeleteArgs<ExtArgs>>): Prisma__CodeReviewClient<$Result.GetResult<Prisma.$CodeReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CodeReview.
     * @param {CodeReviewUpdateArgs} args - Arguments to update one CodeReview.
     * @example
     * // Update one CodeReview
     * const codeReview = await prisma.codeReview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CodeReviewUpdateArgs>(args: SelectSubset<T, CodeReviewUpdateArgs<ExtArgs>>): Prisma__CodeReviewClient<$Result.GetResult<Prisma.$CodeReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CodeReviews.
     * @param {CodeReviewDeleteManyArgs} args - Arguments to filter CodeReviews to delete.
     * @example
     * // Delete a few CodeReviews
     * const { count } = await prisma.codeReview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CodeReviewDeleteManyArgs>(args?: SelectSubset<T, CodeReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CodeReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CodeReviews
     * const codeReview = await prisma.codeReview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CodeReviewUpdateManyArgs>(args: SelectSubset<T, CodeReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CodeReviews and returns the data updated in the database.
     * @param {CodeReviewUpdateManyAndReturnArgs} args - Arguments to update many CodeReviews.
     * @example
     * // Update many CodeReviews
     * const codeReview = await prisma.codeReview.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CodeReviews and only return the `id`
     * const codeReviewWithIdOnly = await prisma.codeReview.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CodeReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, CodeReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodeReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CodeReview.
     * @param {CodeReviewUpsertArgs} args - Arguments to update or create a CodeReview.
     * @example
     * // Update or create a CodeReview
     * const codeReview = await prisma.codeReview.upsert({
     *   create: {
     *     // ... data to create a CodeReview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CodeReview we want to update
     *   }
     * })
     */
    upsert<T extends CodeReviewUpsertArgs>(args: SelectSubset<T, CodeReviewUpsertArgs<ExtArgs>>): Prisma__CodeReviewClient<$Result.GetResult<Prisma.$CodeReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CodeReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeReviewCountArgs} args - Arguments to filter CodeReviews to count.
     * @example
     * // Count the number of CodeReviews
     * const count = await prisma.codeReview.count({
     *   where: {
     *     // ... the filter for the CodeReviews we want to count
     *   }
     * })
    **/
    count<T extends CodeReviewCountArgs>(
      args?: Subset<T, CodeReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CodeReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CodeReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CodeReviewAggregateArgs>(args: Subset<T, CodeReviewAggregateArgs>): Prisma.PrismaPromise<GetCodeReviewAggregateType<T>>

    /**
     * Group by CodeReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodeReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CodeReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CodeReviewGroupByArgs['orderBy'] }
        : { orderBy?: CodeReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CodeReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCodeReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CodeReview model
   */
  readonly fields: CodeReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CodeReview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CodeReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CodeReview model
   */
  interface CodeReviewFieldRefs {
    readonly id: FieldRef<"CodeReview", 'Int'>
    readonly taskId: FieldRef<"CodeReview", 'String'>
    readonly status: FieldRef<"CodeReview", 'String'>
    readonly summary: FieldRef<"CodeReview", 'String'>
    readonly strengths: FieldRef<"CodeReview", 'String'>
    readonly issues: FieldRef<"CodeReview", 'String'>
    readonly acceptanceCriteriaVerification: FieldRef<"CodeReview", 'Json'>
    readonly manualTestingResults: FieldRef<"CodeReview", 'String'>
    readonly requiredChanges: FieldRef<"CodeReview", 'String'>
    readonly createdAt: FieldRef<"CodeReview", 'DateTime'>
    readonly updatedAt: FieldRef<"CodeReview", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CodeReview findUnique
   */
  export type CodeReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeReview
     */
    select?: CodeReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeReview
     */
    omit?: CodeReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeReviewInclude<ExtArgs> | null
    /**
     * Filter, which CodeReview to fetch.
     */
    where: CodeReviewWhereUniqueInput
  }

  /**
   * CodeReview findUniqueOrThrow
   */
  export type CodeReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeReview
     */
    select?: CodeReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeReview
     */
    omit?: CodeReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeReviewInclude<ExtArgs> | null
    /**
     * Filter, which CodeReview to fetch.
     */
    where: CodeReviewWhereUniqueInput
  }

  /**
   * CodeReview findFirst
   */
  export type CodeReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeReview
     */
    select?: CodeReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeReview
     */
    omit?: CodeReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeReviewInclude<ExtArgs> | null
    /**
     * Filter, which CodeReview to fetch.
     */
    where?: CodeReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodeReviews to fetch.
     */
    orderBy?: CodeReviewOrderByWithRelationInput | CodeReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CodeReviews.
     */
    cursor?: CodeReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodeReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodeReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CodeReviews.
     */
    distinct?: CodeReviewScalarFieldEnum | CodeReviewScalarFieldEnum[]
  }

  /**
   * CodeReview findFirstOrThrow
   */
  export type CodeReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeReview
     */
    select?: CodeReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeReview
     */
    omit?: CodeReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeReviewInclude<ExtArgs> | null
    /**
     * Filter, which CodeReview to fetch.
     */
    where?: CodeReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodeReviews to fetch.
     */
    orderBy?: CodeReviewOrderByWithRelationInput | CodeReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CodeReviews.
     */
    cursor?: CodeReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodeReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodeReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CodeReviews.
     */
    distinct?: CodeReviewScalarFieldEnum | CodeReviewScalarFieldEnum[]
  }

  /**
   * CodeReview findMany
   */
  export type CodeReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeReview
     */
    select?: CodeReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeReview
     */
    omit?: CodeReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeReviewInclude<ExtArgs> | null
    /**
     * Filter, which CodeReviews to fetch.
     */
    where?: CodeReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodeReviews to fetch.
     */
    orderBy?: CodeReviewOrderByWithRelationInput | CodeReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CodeReviews.
     */
    cursor?: CodeReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodeReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodeReviews.
     */
    skip?: number
    distinct?: CodeReviewScalarFieldEnum | CodeReviewScalarFieldEnum[]
  }

  /**
   * CodeReview create
   */
  export type CodeReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeReview
     */
    select?: CodeReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeReview
     */
    omit?: CodeReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a CodeReview.
     */
    data: XOR<CodeReviewCreateInput, CodeReviewUncheckedCreateInput>
  }

  /**
   * CodeReview createMany
   */
  export type CodeReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CodeReviews.
     */
    data: CodeReviewCreateManyInput | CodeReviewCreateManyInput[]
  }

  /**
   * CodeReview createManyAndReturn
   */
  export type CodeReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeReview
     */
    select?: CodeReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CodeReview
     */
    omit?: CodeReviewOmit<ExtArgs> | null
    /**
     * The data used to create many CodeReviews.
     */
    data: CodeReviewCreateManyInput | CodeReviewCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CodeReview update
   */
  export type CodeReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeReview
     */
    select?: CodeReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeReview
     */
    omit?: CodeReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a CodeReview.
     */
    data: XOR<CodeReviewUpdateInput, CodeReviewUncheckedUpdateInput>
    /**
     * Choose, which CodeReview to update.
     */
    where: CodeReviewWhereUniqueInput
  }

  /**
   * CodeReview updateMany
   */
  export type CodeReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CodeReviews.
     */
    data: XOR<CodeReviewUpdateManyMutationInput, CodeReviewUncheckedUpdateManyInput>
    /**
     * Filter which CodeReviews to update
     */
    where?: CodeReviewWhereInput
    /**
     * Limit how many CodeReviews to update.
     */
    limit?: number
  }

  /**
   * CodeReview updateManyAndReturn
   */
  export type CodeReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeReview
     */
    select?: CodeReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CodeReview
     */
    omit?: CodeReviewOmit<ExtArgs> | null
    /**
     * The data used to update CodeReviews.
     */
    data: XOR<CodeReviewUpdateManyMutationInput, CodeReviewUncheckedUpdateManyInput>
    /**
     * Filter which CodeReviews to update
     */
    where?: CodeReviewWhereInput
    /**
     * Limit how many CodeReviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CodeReview upsert
   */
  export type CodeReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeReview
     */
    select?: CodeReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeReview
     */
    omit?: CodeReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the CodeReview to update in case it exists.
     */
    where: CodeReviewWhereUniqueInput
    /**
     * In case the CodeReview found by the `where` argument doesn't exist, create a new CodeReview with this data.
     */
    create: XOR<CodeReviewCreateInput, CodeReviewUncheckedCreateInput>
    /**
     * In case the CodeReview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CodeReviewUpdateInput, CodeReviewUncheckedUpdateInput>
  }

  /**
   * CodeReview delete
   */
  export type CodeReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeReview
     */
    select?: CodeReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeReview
     */
    omit?: CodeReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeReviewInclude<ExtArgs> | null
    /**
     * Filter which CodeReview to delete.
     */
    where: CodeReviewWhereUniqueInput
  }

  /**
   * CodeReview deleteMany
   */
  export type CodeReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CodeReviews to delete
     */
    where?: CodeReviewWhereInput
    /**
     * Limit how many CodeReviews to delete.
     */
    limit?: number
  }

  /**
   * CodeReview without action
   */
  export type CodeReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodeReview
     */
    select?: CodeReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodeReview
     */
    omit?: CodeReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodeReviewInclude<ExtArgs> | null
  }


  /**
   * Model CompletionReport
   */

  export type AggregateCompletionReport = {
    _count: CompletionReportCountAggregateOutputType | null
    _avg: CompletionReportAvgAggregateOutputType | null
    _sum: CompletionReportSumAggregateOutputType | null
    _min: CompletionReportMinAggregateOutputType | null
    _max: CompletionReportMaxAggregateOutputType | null
  }

  export type CompletionReportAvgAggregateOutputType = {
    id: number | null
  }

  export type CompletionReportSumAggregateOutputType = {
    id: number | null
  }

  export type CompletionReportMinAggregateOutputType = {
    id: number | null
    taskId: string | null
    summary: string | null
    delegationSummary: string | null
    createdAt: Date | null
  }

  export type CompletionReportMaxAggregateOutputType = {
    id: number | null
    taskId: string | null
    summary: string | null
    delegationSummary: string | null
    createdAt: Date | null
  }

  export type CompletionReportCountAggregateOutputType = {
    id: number
    taskId: number
    summary: number
    filesModified: number
    delegationSummary: number
    acceptanceCriteriaVerification: number
    createdAt: number
    _all: number
  }


  export type CompletionReportAvgAggregateInputType = {
    id?: true
  }

  export type CompletionReportSumAggregateInputType = {
    id?: true
  }

  export type CompletionReportMinAggregateInputType = {
    id?: true
    taskId?: true
    summary?: true
    delegationSummary?: true
    createdAt?: true
  }

  export type CompletionReportMaxAggregateInputType = {
    id?: true
    taskId?: true
    summary?: true
    delegationSummary?: true
    createdAt?: true
  }

  export type CompletionReportCountAggregateInputType = {
    id?: true
    taskId?: true
    summary?: true
    filesModified?: true
    delegationSummary?: true
    acceptanceCriteriaVerification?: true
    createdAt?: true
    _all?: true
  }

  export type CompletionReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompletionReport to aggregate.
     */
    where?: CompletionReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompletionReports to fetch.
     */
    orderBy?: CompletionReportOrderByWithRelationInput | CompletionReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompletionReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompletionReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompletionReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompletionReports
    **/
    _count?: true | CompletionReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompletionReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompletionReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompletionReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompletionReportMaxAggregateInputType
  }

  export type GetCompletionReportAggregateType<T extends CompletionReportAggregateArgs> = {
        [P in keyof T & keyof AggregateCompletionReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompletionReport[P]>
      : GetScalarType<T[P], AggregateCompletionReport[P]>
  }




  export type CompletionReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompletionReportWhereInput
    orderBy?: CompletionReportOrderByWithAggregationInput | CompletionReportOrderByWithAggregationInput[]
    by: CompletionReportScalarFieldEnum[] | CompletionReportScalarFieldEnum
    having?: CompletionReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompletionReportCountAggregateInputType | true
    _avg?: CompletionReportAvgAggregateInputType
    _sum?: CompletionReportSumAggregateInputType
    _min?: CompletionReportMinAggregateInputType
    _max?: CompletionReportMaxAggregateInputType
  }

  export type CompletionReportGroupByOutputType = {
    id: number
    taskId: string
    summary: string
    filesModified: JsonValue
    delegationSummary: string
    acceptanceCriteriaVerification: JsonValue
    createdAt: Date
    _count: CompletionReportCountAggregateOutputType | null
    _avg: CompletionReportAvgAggregateOutputType | null
    _sum: CompletionReportSumAggregateOutputType | null
    _min: CompletionReportMinAggregateOutputType | null
    _max: CompletionReportMaxAggregateOutputType | null
  }

  type GetCompletionReportGroupByPayload<T extends CompletionReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompletionReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompletionReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompletionReportGroupByOutputType[P]>
            : GetScalarType<T[P], CompletionReportGroupByOutputType[P]>
        }
      >
    >


  export type CompletionReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    summary?: boolean
    filesModified?: boolean
    delegationSummary?: boolean
    acceptanceCriteriaVerification?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["completionReport"]>

  export type CompletionReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    summary?: boolean
    filesModified?: boolean
    delegationSummary?: boolean
    acceptanceCriteriaVerification?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["completionReport"]>

  export type CompletionReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    summary?: boolean
    filesModified?: boolean
    delegationSummary?: boolean
    acceptanceCriteriaVerification?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["completionReport"]>

  export type CompletionReportSelectScalar = {
    id?: boolean
    taskId?: boolean
    summary?: boolean
    filesModified?: boolean
    delegationSummary?: boolean
    acceptanceCriteriaVerification?: boolean
    createdAt?: boolean
  }

  export type CompletionReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "summary" | "filesModified" | "delegationSummary" | "acceptanceCriteriaVerification" | "createdAt", ExtArgs["result"]["completionReport"]>
  export type CompletionReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type CompletionReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type CompletionReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }

  export type $CompletionReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompletionReport"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      taskId: string
      summary: string
      filesModified: Prisma.JsonValue
      delegationSummary: string
      acceptanceCriteriaVerification: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["completionReport"]>
    composites: {}
  }

  type CompletionReportGetPayload<S extends boolean | null | undefined | CompletionReportDefaultArgs> = $Result.GetResult<Prisma.$CompletionReportPayload, S>

  type CompletionReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompletionReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompletionReportCountAggregateInputType | true
    }

  export interface CompletionReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompletionReport'], meta: { name: 'CompletionReport' } }
    /**
     * Find zero or one CompletionReport that matches the filter.
     * @param {CompletionReportFindUniqueArgs} args - Arguments to find a CompletionReport
     * @example
     * // Get one CompletionReport
     * const completionReport = await prisma.completionReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompletionReportFindUniqueArgs>(args: SelectSubset<T, CompletionReportFindUniqueArgs<ExtArgs>>): Prisma__CompletionReportClient<$Result.GetResult<Prisma.$CompletionReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CompletionReport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompletionReportFindUniqueOrThrowArgs} args - Arguments to find a CompletionReport
     * @example
     * // Get one CompletionReport
     * const completionReport = await prisma.completionReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompletionReportFindUniqueOrThrowArgs>(args: SelectSubset<T, CompletionReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompletionReportClient<$Result.GetResult<Prisma.$CompletionReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompletionReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletionReportFindFirstArgs} args - Arguments to find a CompletionReport
     * @example
     * // Get one CompletionReport
     * const completionReport = await prisma.completionReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompletionReportFindFirstArgs>(args?: SelectSubset<T, CompletionReportFindFirstArgs<ExtArgs>>): Prisma__CompletionReportClient<$Result.GetResult<Prisma.$CompletionReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompletionReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletionReportFindFirstOrThrowArgs} args - Arguments to find a CompletionReport
     * @example
     * // Get one CompletionReport
     * const completionReport = await prisma.completionReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompletionReportFindFirstOrThrowArgs>(args?: SelectSubset<T, CompletionReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompletionReportClient<$Result.GetResult<Prisma.$CompletionReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompletionReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletionReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompletionReports
     * const completionReports = await prisma.completionReport.findMany()
     * 
     * // Get first 10 CompletionReports
     * const completionReports = await prisma.completionReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const completionReportWithIdOnly = await prisma.completionReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompletionReportFindManyArgs>(args?: SelectSubset<T, CompletionReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompletionReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CompletionReport.
     * @param {CompletionReportCreateArgs} args - Arguments to create a CompletionReport.
     * @example
     * // Create one CompletionReport
     * const CompletionReport = await prisma.completionReport.create({
     *   data: {
     *     // ... data to create a CompletionReport
     *   }
     * })
     * 
     */
    create<T extends CompletionReportCreateArgs>(args: SelectSubset<T, CompletionReportCreateArgs<ExtArgs>>): Prisma__CompletionReportClient<$Result.GetResult<Prisma.$CompletionReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CompletionReports.
     * @param {CompletionReportCreateManyArgs} args - Arguments to create many CompletionReports.
     * @example
     * // Create many CompletionReports
     * const completionReport = await prisma.completionReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompletionReportCreateManyArgs>(args?: SelectSubset<T, CompletionReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompletionReports and returns the data saved in the database.
     * @param {CompletionReportCreateManyAndReturnArgs} args - Arguments to create many CompletionReports.
     * @example
     * // Create many CompletionReports
     * const completionReport = await prisma.completionReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompletionReports and only return the `id`
     * const completionReportWithIdOnly = await prisma.completionReport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompletionReportCreateManyAndReturnArgs>(args?: SelectSubset<T, CompletionReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompletionReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CompletionReport.
     * @param {CompletionReportDeleteArgs} args - Arguments to delete one CompletionReport.
     * @example
     * // Delete one CompletionReport
     * const CompletionReport = await prisma.completionReport.delete({
     *   where: {
     *     // ... filter to delete one CompletionReport
     *   }
     * })
     * 
     */
    delete<T extends CompletionReportDeleteArgs>(args: SelectSubset<T, CompletionReportDeleteArgs<ExtArgs>>): Prisma__CompletionReportClient<$Result.GetResult<Prisma.$CompletionReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CompletionReport.
     * @param {CompletionReportUpdateArgs} args - Arguments to update one CompletionReport.
     * @example
     * // Update one CompletionReport
     * const completionReport = await prisma.completionReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompletionReportUpdateArgs>(args: SelectSubset<T, CompletionReportUpdateArgs<ExtArgs>>): Prisma__CompletionReportClient<$Result.GetResult<Prisma.$CompletionReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CompletionReports.
     * @param {CompletionReportDeleteManyArgs} args - Arguments to filter CompletionReports to delete.
     * @example
     * // Delete a few CompletionReports
     * const { count } = await prisma.completionReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompletionReportDeleteManyArgs>(args?: SelectSubset<T, CompletionReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompletionReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletionReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompletionReports
     * const completionReport = await prisma.completionReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompletionReportUpdateManyArgs>(args: SelectSubset<T, CompletionReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompletionReports and returns the data updated in the database.
     * @param {CompletionReportUpdateManyAndReturnArgs} args - Arguments to update many CompletionReports.
     * @example
     * // Update many CompletionReports
     * const completionReport = await prisma.completionReport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CompletionReports and only return the `id`
     * const completionReportWithIdOnly = await prisma.completionReport.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompletionReportUpdateManyAndReturnArgs>(args: SelectSubset<T, CompletionReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompletionReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CompletionReport.
     * @param {CompletionReportUpsertArgs} args - Arguments to update or create a CompletionReport.
     * @example
     * // Update or create a CompletionReport
     * const completionReport = await prisma.completionReport.upsert({
     *   create: {
     *     // ... data to create a CompletionReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompletionReport we want to update
     *   }
     * })
     */
    upsert<T extends CompletionReportUpsertArgs>(args: SelectSubset<T, CompletionReportUpsertArgs<ExtArgs>>): Prisma__CompletionReportClient<$Result.GetResult<Prisma.$CompletionReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CompletionReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletionReportCountArgs} args - Arguments to filter CompletionReports to count.
     * @example
     * // Count the number of CompletionReports
     * const count = await prisma.completionReport.count({
     *   where: {
     *     // ... the filter for the CompletionReports we want to count
     *   }
     * })
    **/
    count<T extends CompletionReportCountArgs>(
      args?: Subset<T, CompletionReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompletionReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompletionReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletionReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompletionReportAggregateArgs>(args: Subset<T, CompletionReportAggregateArgs>): Prisma.PrismaPromise<GetCompletionReportAggregateType<T>>

    /**
     * Group by CompletionReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompletionReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompletionReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompletionReportGroupByArgs['orderBy'] }
        : { orderBy?: CompletionReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompletionReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompletionReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompletionReport model
   */
  readonly fields: CompletionReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompletionReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompletionReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompletionReport model
   */
  interface CompletionReportFieldRefs {
    readonly id: FieldRef<"CompletionReport", 'Int'>
    readonly taskId: FieldRef<"CompletionReport", 'String'>
    readonly summary: FieldRef<"CompletionReport", 'String'>
    readonly filesModified: FieldRef<"CompletionReport", 'Json'>
    readonly delegationSummary: FieldRef<"CompletionReport", 'String'>
    readonly acceptanceCriteriaVerification: FieldRef<"CompletionReport", 'Json'>
    readonly createdAt: FieldRef<"CompletionReport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CompletionReport findUnique
   */
  export type CompletionReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletionReport
     */
    select?: CompletionReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompletionReport
     */
    omit?: CompletionReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletionReportInclude<ExtArgs> | null
    /**
     * Filter, which CompletionReport to fetch.
     */
    where: CompletionReportWhereUniqueInput
  }

  /**
   * CompletionReport findUniqueOrThrow
   */
  export type CompletionReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletionReport
     */
    select?: CompletionReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompletionReport
     */
    omit?: CompletionReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletionReportInclude<ExtArgs> | null
    /**
     * Filter, which CompletionReport to fetch.
     */
    where: CompletionReportWhereUniqueInput
  }

  /**
   * CompletionReport findFirst
   */
  export type CompletionReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletionReport
     */
    select?: CompletionReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompletionReport
     */
    omit?: CompletionReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletionReportInclude<ExtArgs> | null
    /**
     * Filter, which CompletionReport to fetch.
     */
    where?: CompletionReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompletionReports to fetch.
     */
    orderBy?: CompletionReportOrderByWithRelationInput | CompletionReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompletionReports.
     */
    cursor?: CompletionReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompletionReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompletionReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompletionReports.
     */
    distinct?: CompletionReportScalarFieldEnum | CompletionReportScalarFieldEnum[]
  }

  /**
   * CompletionReport findFirstOrThrow
   */
  export type CompletionReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletionReport
     */
    select?: CompletionReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompletionReport
     */
    omit?: CompletionReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletionReportInclude<ExtArgs> | null
    /**
     * Filter, which CompletionReport to fetch.
     */
    where?: CompletionReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompletionReports to fetch.
     */
    orderBy?: CompletionReportOrderByWithRelationInput | CompletionReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompletionReports.
     */
    cursor?: CompletionReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompletionReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompletionReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompletionReports.
     */
    distinct?: CompletionReportScalarFieldEnum | CompletionReportScalarFieldEnum[]
  }

  /**
   * CompletionReport findMany
   */
  export type CompletionReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletionReport
     */
    select?: CompletionReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompletionReport
     */
    omit?: CompletionReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletionReportInclude<ExtArgs> | null
    /**
     * Filter, which CompletionReports to fetch.
     */
    where?: CompletionReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompletionReports to fetch.
     */
    orderBy?: CompletionReportOrderByWithRelationInput | CompletionReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompletionReports.
     */
    cursor?: CompletionReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompletionReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompletionReports.
     */
    skip?: number
    distinct?: CompletionReportScalarFieldEnum | CompletionReportScalarFieldEnum[]
  }

  /**
   * CompletionReport create
   */
  export type CompletionReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletionReport
     */
    select?: CompletionReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompletionReport
     */
    omit?: CompletionReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletionReportInclude<ExtArgs> | null
    /**
     * The data needed to create a CompletionReport.
     */
    data: XOR<CompletionReportCreateInput, CompletionReportUncheckedCreateInput>
  }

  /**
   * CompletionReport createMany
   */
  export type CompletionReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompletionReports.
     */
    data: CompletionReportCreateManyInput | CompletionReportCreateManyInput[]
  }

  /**
   * CompletionReport createManyAndReturn
   */
  export type CompletionReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletionReport
     */
    select?: CompletionReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompletionReport
     */
    omit?: CompletionReportOmit<ExtArgs> | null
    /**
     * The data used to create many CompletionReports.
     */
    data: CompletionReportCreateManyInput | CompletionReportCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletionReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompletionReport update
   */
  export type CompletionReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletionReport
     */
    select?: CompletionReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompletionReport
     */
    omit?: CompletionReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletionReportInclude<ExtArgs> | null
    /**
     * The data needed to update a CompletionReport.
     */
    data: XOR<CompletionReportUpdateInput, CompletionReportUncheckedUpdateInput>
    /**
     * Choose, which CompletionReport to update.
     */
    where: CompletionReportWhereUniqueInput
  }

  /**
   * CompletionReport updateMany
   */
  export type CompletionReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompletionReports.
     */
    data: XOR<CompletionReportUpdateManyMutationInput, CompletionReportUncheckedUpdateManyInput>
    /**
     * Filter which CompletionReports to update
     */
    where?: CompletionReportWhereInput
    /**
     * Limit how many CompletionReports to update.
     */
    limit?: number
  }

  /**
   * CompletionReport updateManyAndReturn
   */
  export type CompletionReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletionReport
     */
    select?: CompletionReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompletionReport
     */
    omit?: CompletionReportOmit<ExtArgs> | null
    /**
     * The data used to update CompletionReports.
     */
    data: XOR<CompletionReportUpdateManyMutationInput, CompletionReportUncheckedUpdateManyInput>
    /**
     * Filter which CompletionReports to update
     */
    where?: CompletionReportWhereInput
    /**
     * Limit how many CompletionReports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletionReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompletionReport upsert
   */
  export type CompletionReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletionReport
     */
    select?: CompletionReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompletionReport
     */
    omit?: CompletionReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletionReportInclude<ExtArgs> | null
    /**
     * The filter to search for the CompletionReport to update in case it exists.
     */
    where: CompletionReportWhereUniqueInput
    /**
     * In case the CompletionReport found by the `where` argument doesn't exist, create a new CompletionReport with this data.
     */
    create: XOR<CompletionReportCreateInput, CompletionReportUncheckedCreateInput>
    /**
     * In case the CompletionReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompletionReportUpdateInput, CompletionReportUncheckedUpdateInput>
  }

  /**
   * CompletionReport delete
   */
  export type CompletionReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletionReport
     */
    select?: CompletionReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompletionReport
     */
    omit?: CompletionReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletionReportInclude<ExtArgs> | null
    /**
     * Filter which CompletionReport to delete.
     */
    where: CompletionReportWhereUniqueInput
  }

  /**
   * CompletionReport deleteMany
   */
  export type CompletionReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompletionReports to delete
     */
    where?: CompletionReportWhereInput
    /**
     * Limit how many CompletionReports to delete.
     */
    limit?: number
  }

  /**
   * CompletionReport without action
   */
  export type CompletionReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompletionReport
     */
    select?: CompletionReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompletionReport
     */
    omit?: CompletionReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompletionReportInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentAvgAggregateOutputType = {
    id: number | null
    subtaskId: number | null
  }

  export type CommentSumAggregateOutputType = {
    id: number | null
    subtaskId: number | null
  }

  export type CommentMinAggregateOutputType = {
    id: number | null
    taskId: string | null
    subtaskId: number | null
    mode: string | null
    content: string | null
    createdAt: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    id: number | null
    taskId: string | null
    subtaskId: number | null
    mode: string | null
    content: string | null
    createdAt: Date | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    taskId: number
    subtaskId: number
    mode: number
    content: number
    createdAt: number
    _all: number
  }


  export type CommentAvgAggregateInputType = {
    id?: true
    subtaskId?: true
  }

  export type CommentSumAggregateInputType = {
    id?: true
    subtaskId?: true
  }

  export type CommentMinAggregateInputType = {
    id?: true
    taskId?: true
    subtaskId?: true
    mode?: true
    content?: true
    createdAt?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    taskId?: true
    subtaskId?: true
    mode?: true
    content?: true
    createdAt?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    taskId?: true
    subtaskId?: true
    mode?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _avg?: CommentAvgAggregateInputType
    _sum?: CommentSumAggregateInputType
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: number
    taskId: string
    subtaskId: number | null
    mode: string
    content: string
    createdAt: Date
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    subtaskId?: boolean
    mode?: boolean
    content?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    subtask?: boolean | Comment$subtaskArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    subtaskId?: boolean
    mode?: boolean
    content?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    subtask?: boolean | Comment$subtaskArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    subtaskId?: boolean
    mode?: boolean
    content?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    subtask?: boolean | Comment$subtaskArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    id?: boolean
    taskId?: boolean
    subtaskId?: boolean
    mode?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "subtaskId" | "mode" | "content" | "createdAt", ExtArgs["result"]["comment"]>
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    subtask?: boolean | Comment$subtaskArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    subtask?: boolean | Comment$subtaskArgs<ExtArgs>
  }
  export type CommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    subtask?: boolean | Comment$subtaskArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      subtask: Prisma.$SubtaskPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      taskId: string
      subtaskId: number | null
      mode: string
      content: string
      createdAt: Date
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments and returns the data updated in the database.
     * @param {CommentUpdateManyAndReturnArgs} args - Arguments to update many Comments.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subtask<T extends Comment$subtaskArgs<ExtArgs> = {}>(args?: Subset<T, Comment$subtaskArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'Int'>
    readonly taskId: FieldRef<"Comment", 'String'>
    readonly subtaskId: FieldRef<"Comment", 'Int'>
    readonly mode: FieldRef<"Comment", 'String'>
    readonly content: FieldRef<"Comment", 'String'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
  }

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
  }

  /**
   * Comment updateManyAndReturn
   */
  export type CommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to delete.
     */
    limit?: number
  }

  /**
   * Comment.subtask
   */
  export type Comment$subtaskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    where?: SubtaskWhereInput
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Model WorkflowTransition
   */

  export type AggregateWorkflowTransition = {
    _count: WorkflowTransitionCountAggregateOutputType | null
    _avg: WorkflowTransitionAvgAggregateOutputType | null
    _sum: WorkflowTransitionSumAggregateOutputType | null
    _min: WorkflowTransitionMinAggregateOutputType | null
    _max: WorkflowTransitionMaxAggregateOutputType | null
  }

  export type WorkflowTransitionAvgAggregateOutputType = {
    id: number | null
  }

  export type WorkflowTransitionSumAggregateOutputType = {
    id: number | null
  }

  export type WorkflowTransitionMinAggregateOutputType = {
    id: number | null
    taskId: string | null
    fromMode: string | null
    toMode: string | null
    transitionTimestamp: Date | null
    reason: string | null
  }

  export type WorkflowTransitionMaxAggregateOutputType = {
    id: number | null
    taskId: string | null
    fromMode: string | null
    toMode: string | null
    transitionTimestamp: Date | null
    reason: string | null
  }

  export type WorkflowTransitionCountAggregateOutputType = {
    id: number
    taskId: number
    fromMode: number
    toMode: number
    transitionTimestamp: number
    reason: number
    _all: number
  }


  export type WorkflowTransitionAvgAggregateInputType = {
    id?: true
  }

  export type WorkflowTransitionSumAggregateInputType = {
    id?: true
  }

  export type WorkflowTransitionMinAggregateInputType = {
    id?: true
    taskId?: true
    fromMode?: true
    toMode?: true
    transitionTimestamp?: true
    reason?: true
  }

  export type WorkflowTransitionMaxAggregateInputType = {
    id?: true
    taskId?: true
    fromMode?: true
    toMode?: true
    transitionTimestamp?: true
    reason?: true
  }

  export type WorkflowTransitionCountAggregateInputType = {
    id?: true
    taskId?: true
    fromMode?: true
    toMode?: true
    transitionTimestamp?: true
    reason?: true
    _all?: true
  }

  export type WorkflowTransitionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowTransition to aggregate.
     */
    where?: WorkflowTransitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowTransitions to fetch.
     */
    orderBy?: WorkflowTransitionOrderByWithRelationInput | WorkflowTransitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowTransitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowTransitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowTransitions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkflowTransitions
    **/
    _count?: true | WorkflowTransitionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkflowTransitionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkflowTransitionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowTransitionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowTransitionMaxAggregateInputType
  }

  export type GetWorkflowTransitionAggregateType<T extends WorkflowTransitionAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflowTransition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflowTransition[P]>
      : GetScalarType<T[P], AggregateWorkflowTransition[P]>
  }




  export type WorkflowTransitionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowTransitionWhereInput
    orderBy?: WorkflowTransitionOrderByWithAggregationInput | WorkflowTransitionOrderByWithAggregationInput[]
    by: WorkflowTransitionScalarFieldEnum[] | WorkflowTransitionScalarFieldEnum
    having?: WorkflowTransitionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowTransitionCountAggregateInputType | true
    _avg?: WorkflowTransitionAvgAggregateInputType
    _sum?: WorkflowTransitionSumAggregateInputType
    _min?: WorkflowTransitionMinAggregateInputType
    _max?: WorkflowTransitionMaxAggregateInputType
  }

  export type WorkflowTransitionGroupByOutputType = {
    id: number
    taskId: string
    fromMode: string
    toMode: string
    transitionTimestamp: Date
    reason: string | null
    _count: WorkflowTransitionCountAggregateOutputType | null
    _avg: WorkflowTransitionAvgAggregateOutputType | null
    _sum: WorkflowTransitionSumAggregateOutputType | null
    _min: WorkflowTransitionMinAggregateOutputType | null
    _max: WorkflowTransitionMaxAggregateOutputType | null
  }

  type GetWorkflowTransitionGroupByPayload<T extends WorkflowTransitionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowTransitionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowTransitionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowTransitionGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowTransitionGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowTransitionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    fromMode?: boolean
    toMode?: boolean
    transitionTimestamp?: boolean
    reason?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowTransition"]>

  export type WorkflowTransitionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    fromMode?: boolean
    toMode?: boolean
    transitionTimestamp?: boolean
    reason?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowTransition"]>

  export type WorkflowTransitionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    fromMode?: boolean
    toMode?: boolean
    transitionTimestamp?: boolean
    reason?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowTransition"]>

  export type WorkflowTransitionSelectScalar = {
    id?: boolean
    taskId?: boolean
    fromMode?: boolean
    toMode?: boolean
    transitionTimestamp?: boolean
    reason?: boolean
  }

  export type WorkflowTransitionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "fromMode" | "toMode" | "transitionTimestamp" | "reason", ExtArgs["result"]["workflowTransition"]>
  export type WorkflowTransitionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type WorkflowTransitionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type WorkflowTransitionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }

  export type $WorkflowTransitionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkflowTransition"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      taskId: string
      fromMode: string
      toMode: string
      transitionTimestamp: Date
      reason: string | null
    }, ExtArgs["result"]["workflowTransition"]>
    composites: {}
  }

  type WorkflowTransitionGetPayload<S extends boolean | null | undefined | WorkflowTransitionDefaultArgs> = $Result.GetResult<Prisma.$WorkflowTransitionPayload, S>

  type WorkflowTransitionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkflowTransitionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkflowTransitionCountAggregateInputType | true
    }

  export interface WorkflowTransitionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkflowTransition'], meta: { name: 'WorkflowTransition' } }
    /**
     * Find zero or one WorkflowTransition that matches the filter.
     * @param {WorkflowTransitionFindUniqueArgs} args - Arguments to find a WorkflowTransition
     * @example
     * // Get one WorkflowTransition
     * const workflowTransition = await prisma.workflowTransition.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowTransitionFindUniqueArgs>(args: SelectSubset<T, WorkflowTransitionFindUniqueArgs<ExtArgs>>): Prisma__WorkflowTransitionClient<$Result.GetResult<Prisma.$WorkflowTransitionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkflowTransition that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkflowTransitionFindUniqueOrThrowArgs} args - Arguments to find a WorkflowTransition
     * @example
     * // Get one WorkflowTransition
     * const workflowTransition = await prisma.workflowTransition.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowTransitionFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowTransitionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowTransitionClient<$Result.GetResult<Prisma.$WorkflowTransitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowTransition that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowTransitionFindFirstArgs} args - Arguments to find a WorkflowTransition
     * @example
     * // Get one WorkflowTransition
     * const workflowTransition = await prisma.workflowTransition.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowTransitionFindFirstArgs>(args?: SelectSubset<T, WorkflowTransitionFindFirstArgs<ExtArgs>>): Prisma__WorkflowTransitionClient<$Result.GetResult<Prisma.$WorkflowTransitionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowTransition that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowTransitionFindFirstOrThrowArgs} args - Arguments to find a WorkflowTransition
     * @example
     * // Get one WorkflowTransition
     * const workflowTransition = await prisma.workflowTransition.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowTransitionFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowTransitionFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowTransitionClient<$Result.GetResult<Prisma.$WorkflowTransitionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkflowTransitions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowTransitionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkflowTransitions
     * const workflowTransitions = await prisma.workflowTransition.findMany()
     * 
     * // Get first 10 WorkflowTransitions
     * const workflowTransitions = await prisma.workflowTransition.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowTransitionWithIdOnly = await prisma.workflowTransition.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowTransitionFindManyArgs>(args?: SelectSubset<T, WorkflowTransitionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowTransitionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkflowTransition.
     * @param {WorkflowTransitionCreateArgs} args - Arguments to create a WorkflowTransition.
     * @example
     * // Create one WorkflowTransition
     * const WorkflowTransition = await prisma.workflowTransition.create({
     *   data: {
     *     // ... data to create a WorkflowTransition
     *   }
     * })
     * 
     */
    create<T extends WorkflowTransitionCreateArgs>(args: SelectSubset<T, WorkflowTransitionCreateArgs<ExtArgs>>): Prisma__WorkflowTransitionClient<$Result.GetResult<Prisma.$WorkflowTransitionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkflowTransitions.
     * @param {WorkflowTransitionCreateManyArgs} args - Arguments to create many WorkflowTransitions.
     * @example
     * // Create many WorkflowTransitions
     * const workflowTransition = await prisma.workflowTransition.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowTransitionCreateManyArgs>(args?: SelectSubset<T, WorkflowTransitionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkflowTransitions and returns the data saved in the database.
     * @param {WorkflowTransitionCreateManyAndReturnArgs} args - Arguments to create many WorkflowTransitions.
     * @example
     * // Create many WorkflowTransitions
     * const workflowTransition = await prisma.workflowTransition.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkflowTransitions and only return the `id`
     * const workflowTransitionWithIdOnly = await prisma.workflowTransition.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowTransitionCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowTransitionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowTransitionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkflowTransition.
     * @param {WorkflowTransitionDeleteArgs} args - Arguments to delete one WorkflowTransition.
     * @example
     * // Delete one WorkflowTransition
     * const WorkflowTransition = await prisma.workflowTransition.delete({
     *   where: {
     *     // ... filter to delete one WorkflowTransition
     *   }
     * })
     * 
     */
    delete<T extends WorkflowTransitionDeleteArgs>(args: SelectSubset<T, WorkflowTransitionDeleteArgs<ExtArgs>>): Prisma__WorkflowTransitionClient<$Result.GetResult<Prisma.$WorkflowTransitionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkflowTransition.
     * @param {WorkflowTransitionUpdateArgs} args - Arguments to update one WorkflowTransition.
     * @example
     * // Update one WorkflowTransition
     * const workflowTransition = await prisma.workflowTransition.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowTransitionUpdateArgs>(args: SelectSubset<T, WorkflowTransitionUpdateArgs<ExtArgs>>): Prisma__WorkflowTransitionClient<$Result.GetResult<Prisma.$WorkflowTransitionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkflowTransitions.
     * @param {WorkflowTransitionDeleteManyArgs} args - Arguments to filter WorkflowTransitions to delete.
     * @example
     * // Delete a few WorkflowTransitions
     * const { count } = await prisma.workflowTransition.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowTransitionDeleteManyArgs>(args?: SelectSubset<T, WorkflowTransitionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowTransitions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowTransitionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkflowTransitions
     * const workflowTransition = await prisma.workflowTransition.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowTransitionUpdateManyArgs>(args: SelectSubset<T, WorkflowTransitionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowTransitions and returns the data updated in the database.
     * @param {WorkflowTransitionUpdateManyAndReturnArgs} args - Arguments to update many WorkflowTransitions.
     * @example
     * // Update many WorkflowTransitions
     * const workflowTransition = await prisma.workflowTransition.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkflowTransitions and only return the `id`
     * const workflowTransitionWithIdOnly = await prisma.workflowTransition.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkflowTransitionUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkflowTransitionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowTransitionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkflowTransition.
     * @param {WorkflowTransitionUpsertArgs} args - Arguments to update or create a WorkflowTransition.
     * @example
     * // Update or create a WorkflowTransition
     * const workflowTransition = await prisma.workflowTransition.upsert({
     *   create: {
     *     // ... data to create a WorkflowTransition
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkflowTransition we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowTransitionUpsertArgs>(args: SelectSubset<T, WorkflowTransitionUpsertArgs<ExtArgs>>): Prisma__WorkflowTransitionClient<$Result.GetResult<Prisma.$WorkflowTransitionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkflowTransitions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowTransitionCountArgs} args - Arguments to filter WorkflowTransitions to count.
     * @example
     * // Count the number of WorkflowTransitions
     * const count = await prisma.workflowTransition.count({
     *   where: {
     *     // ... the filter for the WorkflowTransitions we want to count
     *   }
     * })
    **/
    count<T extends WorkflowTransitionCountArgs>(
      args?: Subset<T, WorkflowTransitionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowTransitionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkflowTransition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowTransitionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkflowTransitionAggregateArgs>(args: Subset<T, WorkflowTransitionAggregateArgs>): Prisma.PrismaPromise<GetWorkflowTransitionAggregateType<T>>

    /**
     * Group by WorkflowTransition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowTransitionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkflowTransitionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowTransitionGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowTransitionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkflowTransitionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowTransitionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkflowTransition model
   */
  readonly fields: WorkflowTransitionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkflowTransition.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowTransitionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkflowTransition model
   */
  interface WorkflowTransitionFieldRefs {
    readonly id: FieldRef<"WorkflowTransition", 'Int'>
    readonly taskId: FieldRef<"WorkflowTransition", 'String'>
    readonly fromMode: FieldRef<"WorkflowTransition", 'String'>
    readonly toMode: FieldRef<"WorkflowTransition", 'String'>
    readonly transitionTimestamp: FieldRef<"WorkflowTransition", 'DateTime'>
    readonly reason: FieldRef<"WorkflowTransition", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WorkflowTransition findUnique
   */
  export type WorkflowTransitionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTransition
     */
    select?: WorkflowTransitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTransition
     */
    omit?: WorkflowTransitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowTransitionInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowTransition to fetch.
     */
    where: WorkflowTransitionWhereUniqueInput
  }

  /**
   * WorkflowTransition findUniqueOrThrow
   */
  export type WorkflowTransitionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTransition
     */
    select?: WorkflowTransitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTransition
     */
    omit?: WorkflowTransitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowTransitionInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowTransition to fetch.
     */
    where: WorkflowTransitionWhereUniqueInput
  }

  /**
   * WorkflowTransition findFirst
   */
  export type WorkflowTransitionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTransition
     */
    select?: WorkflowTransitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTransition
     */
    omit?: WorkflowTransitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowTransitionInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowTransition to fetch.
     */
    where?: WorkflowTransitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowTransitions to fetch.
     */
    orderBy?: WorkflowTransitionOrderByWithRelationInput | WorkflowTransitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowTransitions.
     */
    cursor?: WorkflowTransitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowTransitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowTransitions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowTransitions.
     */
    distinct?: WorkflowTransitionScalarFieldEnum | WorkflowTransitionScalarFieldEnum[]
  }

  /**
   * WorkflowTransition findFirstOrThrow
   */
  export type WorkflowTransitionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTransition
     */
    select?: WorkflowTransitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTransition
     */
    omit?: WorkflowTransitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowTransitionInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowTransition to fetch.
     */
    where?: WorkflowTransitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowTransitions to fetch.
     */
    orderBy?: WorkflowTransitionOrderByWithRelationInput | WorkflowTransitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowTransitions.
     */
    cursor?: WorkflowTransitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowTransitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowTransitions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowTransitions.
     */
    distinct?: WorkflowTransitionScalarFieldEnum | WorkflowTransitionScalarFieldEnum[]
  }

  /**
   * WorkflowTransition findMany
   */
  export type WorkflowTransitionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTransition
     */
    select?: WorkflowTransitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTransition
     */
    omit?: WorkflowTransitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowTransitionInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowTransitions to fetch.
     */
    where?: WorkflowTransitionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowTransitions to fetch.
     */
    orderBy?: WorkflowTransitionOrderByWithRelationInput | WorkflowTransitionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkflowTransitions.
     */
    cursor?: WorkflowTransitionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowTransitions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowTransitions.
     */
    skip?: number
    distinct?: WorkflowTransitionScalarFieldEnum | WorkflowTransitionScalarFieldEnum[]
  }

  /**
   * WorkflowTransition create
   */
  export type WorkflowTransitionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTransition
     */
    select?: WorkflowTransitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTransition
     */
    omit?: WorkflowTransitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowTransitionInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkflowTransition.
     */
    data: XOR<WorkflowTransitionCreateInput, WorkflowTransitionUncheckedCreateInput>
  }

  /**
   * WorkflowTransition createMany
   */
  export type WorkflowTransitionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkflowTransitions.
     */
    data: WorkflowTransitionCreateManyInput | WorkflowTransitionCreateManyInput[]
  }

  /**
   * WorkflowTransition createManyAndReturn
   */
  export type WorkflowTransitionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTransition
     */
    select?: WorkflowTransitionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTransition
     */
    omit?: WorkflowTransitionOmit<ExtArgs> | null
    /**
     * The data used to create many WorkflowTransitions.
     */
    data: WorkflowTransitionCreateManyInput | WorkflowTransitionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowTransitionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowTransition update
   */
  export type WorkflowTransitionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTransition
     */
    select?: WorkflowTransitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTransition
     */
    omit?: WorkflowTransitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowTransitionInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkflowTransition.
     */
    data: XOR<WorkflowTransitionUpdateInput, WorkflowTransitionUncheckedUpdateInput>
    /**
     * Choose, which WorkflowTransition to update.
     */
    where: WorkflowTransitionWhereUniqueInput
  }

  /**
   * WorkflowTransition updateMany
   */
  export type WorkflowTransitionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkflowTransitions.
     */
    data: XOR<WorkflowTransitionUpdateManyMutationInput, WorkflowTransitionUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowTransitions to update
     */
    where?: WorkflowTransitionWhereInput
    /**
     * Limit how many WorkflowTransitions to update.
     */
    limit?: number
  }

  /**
   * WorkflowTransition updateManyAndReturn
   */
  export type WorkflowTransitionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTransition
     */
    select?: WorkflowTransitionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTransition
     */
    omit?: WorkflowTransitionOmit<ExtArgs> | null
    /**
     * The data used to update WorkflowTransitions.
     */
    data: XOR<WorkflowTransitionUpdateManyMutationInput, WorkflowTransitionUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowTransitions to update
     */
    where?: WorkflowTransitionWhereInput
    /**
     * Limit how many WorkflowTransitions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowTransitionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowTransition upsert
   */
  export type WorkflowTransitionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTransition
     */
    select?: WorkflowTransitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTransition
     */
    omit?: WorkflowTransitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowTransitionInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkflowTransition to update in case it exists.
     */
    where: WorkflowTransitionWhereUniqueInput
    /**
     * In case the WorkflowTransition found by the `where` argument doesn't exist, create a new WorkflowTransition with this data.
     */
    create: XOR<WorkflowTransitionCreateInput, WorkflowTransitionUncheckedCreateInput>
    /**
     * In case the WorkflowTransition was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowTransitionUpdateInput, WorkflowTransitionUncheckedUpdateInput>
  }

  /**
   * WorkflowTransition delete
   */
  export type WorkflowTransitionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTransition
     */
    select?: WorkflowTransitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTransition
     */
    omit?: WorkflowTransitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowTransitionInclude<ExtArgs> | null
    /**
     * Filter which WorkflowTransition to delete.
     */
    where: WorkflowTransitionWhereUniqueInput
  }

  /**
   * WorkflowTransition deleteMany
   */
  export type WorkflowTransitionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowTransitions to delete
     */
    where?: WorkflowTransitionWhereInput
    /**
     * Limit how many WorkflowTransitions to delete.
     */
    limit?: number
  }

  /**
   * WorkflowTransition without action
   */
  export type WorkflowTransitionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTransition
     */
    select?: WorkflowTransitionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTransition
     */
    omit?: WorkflowTransitionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowTransitionInclude<ExtArgs> | null
  }


  /**
   * Model CodebaseAnalysis
   */

  export type AggregateCodebaseAnalysis = {
    _count: CodebaseAnalysisCountAggregateOutputType | null
    _avg: CodebaseAnalysisAvgAggregateOutputType | null
    _sum: CodebaseAnalysisSumAggregateOutputType | null
    _min: CodebaseAnalysisMinAggregateOutputType | null
    _max: CodebaseAnalysisMaxAggregateOutputType | null
  }

  export type CodebaseAnalysisAvgAggregateOutputType = {
    id: number | null
  }

  export type CodebaseAnalysisSumAggregateOutputType = {
    id: number | null
  }

  export type CodebaseAnalysisMinAggregateOutputType = {
    id: number | null
    taskId: string | null
    analyzedAt: Date | null
    updatedAt: Date | null
    analyzedBy: string | null
    analysisVersion: string | null
  }

  export type CodebaseAnalysisMaxAggregateOutputType = {
    id: number | null
    taskId: string | null
    analyzedAt: Date | null
    updatedAt: Date | null
    analyzedBy: string | null
    analysisVersion: string | null
  }

  export type CodebaseAnalysisCountAggregateOutputType = {
    id: number
    taskId: number
    architectureFindings: number
    problemsIdentified: number
    implementationContext: number
    integrationPoints: number
    qualityAssessment: number
    filesCovered: number
    technologyStack: number
    analyzedAt: number
    updatedAt: number
    analyzedBy: number
    analysisVersion: number
    _all: number
  }


  export type CodebaseAnalysisAvgAggregateInputType = {
    id?: true
  }

  export type CodebaseAnalysisSumAggregateInputType = {
    id?: true
  }

  export type CodebaseAnalysisMinAggregateInputType = {
    id?: true
    taskId?: true
    analyzedAt?: true
    updatedAt?: true
    analyzedBy?: true
    analysisVersion?: true
  }

  export type CodebaseAnalysisMaxAggregateInputType = {
    id?: true
    taskId?: true
    analyzedAt?: true
    updatedAt?: true
    analyzedBy?: true
    analysisVersion?: true
  }

  export type CodebaseAnalysisCountAggregateInputType = {
    id?: true
    taskId?: true
    architectureFindings?: true
    problemsIdentified?: true
    implementationContext?: true
    integrationPoints?: true
    qualityAssessment?: true
    filesCovered?: true
    technologyStack?: true
    analyzedAt?: true
    updatedAt?: true
    analyzedBy?: true
    analysisVersion?: true
    _all?: true
  }

  export type CodebaseAnalysisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CodebaseAnalysis to aggregate.
     */
    where?: CodebaseAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodebaseAnalyses to fetch.
     */
    orderBy?: CodebaseAnalysisOrderByWithRelationInput | CodebaseAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CodebaseAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodebaseAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodebaseAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CodebaseAnalyses
    **/
    _count?: true | CodebaseAnalysisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CodebaseAnalysisAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CodebaseAnalysisSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CodebaseAnalysisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CodebaseAnalysisMaxAggregateInputType
  }

  export type GetCodebaseAnalysisAggregateType<T extends CodebaseAnalysisAggregateArgs> = {
        [P in keyof T & keyof AggregateCodebaseAnalysis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCodebaseAnalysis[P]>
      : GetScalarType<T[P], AggregateCodebaseAnalysis[P]>
  }




  export type CodebaseAnalysisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CodebaseAnalysisWhereInput
    orderBy?: CodebaseAnalysisOrderByWithAggregationInput | CodebaseAnalysisOrderByWithAggregationInput[]
    by: CodebaseAnalysisScalarFieldEnum[] | CodebaseAnalysisScalarFieldEnum
    having?: CodebaseAnalysisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CodebaseAnalysisCountAggregateInputType | true
    _avg?: CodebaseAnalysisAvgAggregateInputType
    _sum?: CodebaseAnalysisSumAggregateInputType
    _min?: CodebaseAnalysisMinAggregateInputType
    _max?: CodebaseAnalysisMaxAggregateInputType
  }

  export type CodebaseAnalysisGroupByOutputType = {
    id: number
    taskId: string
    architectureFindings: JsonValue
    problemsIdentified: JsonValue
    implementationContext: JsonValue
    integrationPoints: JsonValue
    qualityAssessment: JsonValue
    filesCovered: JsonValue
    technologyStack: JsonValue
    analyzedAt: Date
    updatedAt: Date
    analyzedBy: string
    analysisVersion: string
    _count: CodebaseAnalysisCountAggregateOutputType | null
    _avg: CodebaseAnalysisAvgAggregateOutputType | null
    _sum: CodebaseAnalysisSumAggregateOutputType | null
    _min: CodebaseAnalysisMinAggregateOutputType | null
    _max: CodebaseAnalysisMaxAggregateOutputType | null
  }

  type GetCodebaseAnalysisGroupByPayload<T extends CodebaseAnalysisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CodebaseAnalysisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CodebaseAnalysisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CodebaseAnalysisGroupByOutputType[P]>
            : GetScalarType<T[P], CodebaseAnalysisGroupByOutputType[P]>
        }
      >
    >


  export type CodebaseAnalysisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    architectureFindings?: boolean
    problemsIdentified?: boolean
    implementationContext?: boolean
    integrationPoints?: boolean
    qualityAssessment?: boolean
    filesCovered?: boolean
    technologyStack?: boolean
    analyzedAt?: boolean
    updatedAt?: boolean
    analyzedBy?: boolean
    analysisVersion?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["codebaseAnalysis"]>

  export type CodebaseAnalysisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    architectureFindings?: boolean
    problemsIdentified?: boolean
    implementationContext?: boolean
    integrationPoints?: boolean
    qualityAssessment?: boolean
    filesCovered?: boolean
    technologyStack?: boolean
    analyzedAt?: boolean
    updatedAt?: boolean
    analyzedBy?: boolean
    analysisVersion?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["codebaseAnalysis"]>

  export type CodebaseAnalysisSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    architectureFindings?: boolean
    problemsIdentified?: boolean
    implementationContext?: boolean
    integrationPoints?: boolean
    qualityAssessment?: boolean
    filesCovered?: boolean
    technologyStack?: boolean
    analyzedAt?: boolean
    updatedAt?: boolean
    analyzedBy?: boolean
    analysisVersion?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["codebaseAnalysis"]>

  export type CodebaseAnalysisSelectScalar = {
    id?: boolean
    taskId?: boolean
    architectureFindings?: boolean
    problemsIdentified?: boolean
    implementationContext?: boolean
    integrationPoints?: boolean
    qualityAssessment?: boolean
    filesCovered?: boolean
    technologyStack?: boolean
    analyzedAt?: boolean
    updatedAt?: boolean
    analyzedBy?: boolean
    analysisVersion?: boolean
  }

  export type CodebaseAnalysisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "architectureFindings" | "problemsIdentified" | "implementationContext" | "integrationPoints" | "qualityAssessment" | "filesCovered" | "technologyStack" | "analyzedAt" | "updatedAt" | "analyzedBy" | "analysisVersion", ExtArgs["result"]["codebaseAnalysis"]>
  export type CodebaseAnalysisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type CodebaseAnalysisIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type CodebaseAnalysisIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }

  export type $CodebaseAnalysisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CodebaseAnalysis"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      taskId: string
      architectureFindings: Prisma.JsonValue
      problemsIdentified: Prisma.JsonValue
      implementationContext: Prisma.JsonValue
      integrationPoints: Prisma.JsonValue
      qualityAssessment: Prisma.JsonValue
      filesCovered: Prisma.JsonValue
      technologyStack: Prisma.JsonValue
      analyzedAt: Date
      updatedAt: Date
      analyzedBy: string
      analysisVersion: string
    }, ExtArgs["result"]["codebaseAnalysis"]>
    composites: {}
  }

  type CodebaseAnalysisGetPayload<S extends boolean | null | undefined | CodebaseAnalysisDefaultArgs> = $Result.GetResult<Prisma.$CodebaseAnalysisPayload, S>

  type CodebaseAnalysisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CodebaseAnalysisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CodebaseAnalysisCountAggregateInputType | true
    }

  export interface CodebaseAnalysisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CodebaseAnalysis'], meta: { name: 'CodebaseAnalysis' } }
    /**
     * Find zero or one CodebaseAnalysis that matches the filter.
     * @param {CodebaseAnalysisFindUniqueArgs} args - Arguments to find a CodebaseAnalysis
     * @example
     * // Get one CodebaseAnalysis
     * const codebaseAnalysis = await prisma.codebaseAnalysis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CodebaseAnalysisFindUniqueArgs>(args: SelectSubset<T, CodebaseAnalysisFindUniqueArgs<ExtArgs>>): Prisma__CodebaseAnalysisClient<$Result.GetResult<Prisma.$CodebaseAnalysisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CodebaseAnalysis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CodebaseAnalysisFindUniqueOrThrowArgs} args - Arguments to find a CodebaseAnalysis
     * @example
     * // Get one CodebaseAnalysis
     * const codebaseAnalysis = await prisma.codebaseAnalysis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CodebaseAnalysisFindUniqueOrThrowArgs>(args: SelectSubset<T, CodebaseAnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CodebaseAnalysisClient<$Result.GetResult<Prisma.$CodebaseAnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CodebaseAnalysis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodebaseAnalysisFindFirstArgs} args - Arguments to find a CodebaseAnalysis
     * @example
     * // Get one CodebaseAnalysis
     * const codebaseAnalysis = await prisma.codebaseAnalysis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CodebaseAnalysisFindFirstArgs>(args?: SelectSubset<T, CodebaseAnalysisFindFirstArgs<ExtArgs>>): Prisma__CodebaseAnalysisClient<$Result.GetResult<Prisma.$CodebaseAnalysisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CodebaseAnalysis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodebaseAnalysisFindFirstOrThrowArgs} args - Arguments to find a CodebaseAnalysis
     * @example
     * // Get one CodebaseAnalysis
     * const codebaseAnalysis = await prisma.codebaseAnalysis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CodebaseAnalysisFindFirstOrThrowArgs>(args?: SelectSubset<T, CodebaseAnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma__CodebaseAnalysisClient<$Result.GetResult<Prisma.$CodebaseAnalysisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CodebaseAnalyses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodebaseAnalysisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CodebaseAnalyses
     * const codebaseAnalyses = await prisma.codebaseAnalysis.findMany()
     * 
     * // Get first 10 CodebaseAnalyses
     * const codebaseAnalyses = await prisma.codebaseAnalysis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const codebaseAnalysisWithIdOnly = await prisma.codebaseAnalysis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CodebaseAnalysisFindManyArgs>(args?: SelectSubset<T, CodebaseAnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodebaseAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CodebaseAnalysis.
     * @param {CodebaseAnalysisCreateArgs} args - Arguments to create a CodebaseAnalysis.
     * @example
     * // Create one CodebaseAnalysis
     * const CodebaseAnalysis = await prisma.codebaseAnalysis.create({
     *   data: {
     *     // ... data to create a CodebaseAnalysis
     *   }
     * })
     * 
     */
    create<T extends CodebaseAnalysisCreateArgs>(args: SelectSubset<T, CodebaseAnalysisCreateArgs<ExtArgs>>): Prisma__CodebaseAnalysisClient<$Result.GetResult<Prisma.$CodebaseAnalysisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CodebaseAnalyses.
     * @param {CodebaseAnalysisCreateManyArgs} args - Arguments to create many CodebaseAnalyses.
     * @example
     * // Create many CodebaseAnalyses
     * const codebaseAnalysis = await prisma.codebaseAnalysis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CodebaseAnalysisCreateManyArgs>(args?: SelectSubset<T, CodebaseAnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CodebaseAnalyses and returns the data saved in the database.
     * @param {CodebaseAnalysisCreateManyAndReturnArgs} args - Arguments to create many CodebaseAnalyses.
     * @example
     * // Create many CodebaseAnalyses
     * const codebaseAnalysis = await prisma.codebaseAnalysis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CodebaseAnalyses and only return the `id`
     * const codebaseAnalysisWithIdOnly = await prisma.codebaseAnalysis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CodebaseAnalysisCreateManyAndReturnArgs>(args?: SelectSubset<T, CodebaseAnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodebaseAnalysisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CodebaseAnalysis.
     * @param {CodebaseAnalysisDeleteArgs} args - Arguments to delete one CodebaseAnalysis.
     * @example
     * // Delete one CodebaseAnalysis
     * const CodebaseAnalysis = await prisma.codebaseAnalysis.delete({
     *   where: {
     *     // ... filter to delete one CodebaseAnalysis
     *   }
     * })
     * 
     */
    delete<T extends CodebaseAnalysisDeleteArgs>(args: SelectSubset<T, CodebaseAnalysisDeleteArgs<ExtArgs>>): Prisma__CodebaseAnalysisClient<$Result.GetResult<Prisma.$CodebaseAnalysisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CodebaseAnalysis.
     * @param {CodebaseAnalysisUpdateArgs} args - Arguments to update one CodebaseAnalysis.
     * @example
     * // Update one CodebaseAnalysis
     * const codebaseAnalysis = await prisma.codebaseAnalysis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CodebaseAnalysisUpdateArgs>(args: SelectSubset<T, CodebaseAnalysisUpdateArgs<ExtArgs>>): Prisma__CodebaseAnalysisClient<$Result.GetResult<Prisma.$CodebaseAnalysisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CodebaseAnalyses.
     * @param {CodebaseAnalysisDeleteManyArgs} args - Arguments to filter CodebaseAnalyses to delete.
     * @example
     * // Delete a few CodebaseAnalyses
     * const { count } = await prisma.codebaseAnalysis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CodebaseAnalysisDeleteManyArgs>(args?: SelectSubset<T, CodebaseAnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CodebaseAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodebaseAnalysisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CodebaseAnalyses
     * const codebaseAnalysis = await prisma.codebaseAnalysis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CodebaseAnalysisUpdateManyArgs>(args: SelectSubset<T, CodebaseAnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CodebaseAnalyses and returns the data updated in the database.
     * @param {CodebaseAnalysisUpdateManyAndReturnArgs} args - Arguments to update many CodebaseAnalyses.
     * @example
     * // Update many CodebaseAnalyses
     * const codebaseAnalysis = await prisma.codebaseAnalysis.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CodebaseAnalyses and only return the `id`
     * const codebaseAnalysisWithIdOnly = await prisma.codebaseAnalysis.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CodebaseAnalysisUpdateManyAndReturnArgs>(args: SelectSubset<T, CodebaseAnalysisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CodebaseAnalysisPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CodebaseAnalysis.
     * @param {CodebaseAnalysisUpsertArgs} args - Arguments to update or create a CodebaseAnalysis.
     * @example
     * // Update or create a CodebaseAnalysis
     * const codebaseAnalysis = await prisma.codebaseAnalysis.upsert({
     *   create: {
     *     // ... data to create a CodebaseAnalysis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CodebaseAnalysis we want to update
     *   }
     * })
     */
    upsert<T extends CodebaseAnalysisUpsertArgs>(args: SelectSubset<T, CodebaseAnalysisUpsertArgs<ExtArgs>>): Prisma__CodebaseAnalysisClient<$Result.GetResult<Prisma.$CodebaseAnalysisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CodebaseAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodebaseAnalysisCountArgs} args - Arguments to filter CodebaseAnalyses to count.
     * @example
     * // Count the number of CodebaseAnalyses
     * const count = await prisma.codebaseAnalysis.count({
     *   where: {
     *     // ... the filter for the CodebaseAnalyses we want to count
     *   }
     * })
    **/
    count<T extends CodebaseAnalysisCountArgs>(
      args?: Subset<T, CodebaseAnalysisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CodebaseAnalysisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CodebaseAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodebaseAnalysisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CodebaseAnalysisAggregateArgs>(args: Subset<T, CodebaseAnalysisAggregateArgs>): Prisma.PrismaPromise<GetCodebaseAnalysisAggregateType<T>>

    /**
     * Group by CodebaseAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CodebaseAnalysisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CodebaseAnalysisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CodebaseAnalysisGroupByArgs['orderBy'] }
        : { orderBy?: CodebaseAnalysisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CodebaseAnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCodebaseAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CodebaseAnalysis model
   */
  readonly fields: CodebaseAnalysisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CodebaseAnalysis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CodebaseAnalysisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CodebaseAnalysis model
   */
  interface CodebaseAnalysisFieldRefs {
    readonly id: FieldRef<"CodebaseAnalysis", 'Int'>
    readonly taskId: FieldRef<"CodebaseAnalysis", 'String'>
    readonly architectureFindings: FieldRef<"CodebaseAnalysis", 'Json'>
    readonly problemsIdentified: FieldRef<"CodebaseAnalysis", 'Json'>
    readonly implementationContext: FieldRef<"CodebaseAnalysis", 'Json'>
    readonly integrationPoints: FieldRef<"CodebaseAnalysis", 'Json'>
    readonly qualityAssessment: FieldRef<"CodebaseAnalysis", 'Json'>
    readonly filesCovered: FieldRef<"CodebaseAnalysis", 'Json'>
    readonly technologyStack: FieldRef<"CodebaseAnalysis", 'Json'>
    readonly analyzedAt: FieldRef<"CodebaseAnalysis", 'DateTime'>
    readonly updatedAt: FieldRef<"CodebaseAnalysis", 'DateTime'>
    readonly analyzedBy: FieldRef<"CodebaseAnalysis", 'String'>
    readonly analysisVersion: FieldRef<"CodebaseAnalysis", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CodebaseAnalysis findUnique
   */
  export type CodebaseAnalysisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodebaseAnalysis
     */
    select?: CodebaseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodebaseAnalysis
     */
    omit?: CodebaseAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodebaseAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which CodebaseAnalysis to fetch.
     */
    where: CodebaseAnalysisWhereUniqueInput
  }

  /**
   * CodebaseAnalysis findUniqueOrThrow
   */
  export type CodebaseAnalysisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodebaseAnalysis
     */
    select?: CodebaseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodebaseAnalysis
     */
    omit?: CodebaseAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodebaseAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which CodebaseAnalysis to fetch.
     */
    where: CodebaseAnalysisWhereUniqueInput
  }

  /**
   * CodebaseAnalysis findFirst
   */
  export type CodebaseAnalysisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodebaseAnalysis
     */
    select?: CodebaseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodebaseAnalysis
     */
    omit?: CodebaseAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodebaseAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which CodebaseAnalysis to fetch.
     */
    where?: CodebaseAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodebaseAnalyses to fetch.
     */
    orderBy?: CodebaseAnalysisOrderByWithRelationInput | CodebaseAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CodebaseAnalyses.
     */
    cursor?: CodebaseAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodebaseAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodebaseAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CodebaseAnalyses.
     */
    distinct?: CodebaseAnalysisScalarFieldEnum | CodebaseAnalysisScalarFieldEnum[]
  }

  /**
   * CodebaseAnalysis findFirstOrThrow
   */
  export type CodebaseAnalysisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodebaseAnalysis
     */
    select?: CodebaseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodebaseAnalysis
     */
    omit?: CodebaseAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodebaseAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which CodebaseAnalysis to fetch.
     */
    where?: CodebaseAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodebaseAnalyses to fetch.
     */
    orderBy?: CodebaseAnalysisOrderByWithRelationInput | CodebaseAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CodebaseAnalyses.
     */
    cursor?: CodebaseAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodebaseAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodebaseAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CodebaseAnalyses.
     */
    distinct?: CodebaseAnalysisScalarFieldEnum | CodebaseAnalysisScalarFieldEnum[]
  }

  /**
   * CodebaseAnalysis findMany
   */
  export type CodebaseAnalysisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodebaseAnalysis
     */
    select?: CodebaseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodebaseAnalysis
     */
    omit?: CodebaseAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodebaseAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which CodebaseAnalyses to fetch.
     */
    where?: CodebaseAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CodebaseAnalyses to fetch.
     */
    orderBy?: CodebaseAnalysisOrderByWithRelationInput | CodebaseAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CodebaseAnalyses.
     */
    cursor?: CodebaseAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CodebaseAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CodebaseAnalyses.
     */
    skip?: number
    distinct?: CodebaseAnalysisScalarFieldEnum | CodebaseAnalysisScalarFieldEnum[]
  }

  /**
   * CodebaseAnalysis create
   */
  export type CodebaseAnalysisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodebaseAnalysis
     */
    select?: CodebaseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodebaseAnalysis
     */
    omit?: CodebaseAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodebaseAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to create a CodebaseAnalysis.
     */
    data: XOR<CodebaseAnalysisCreateInput, CodebaseAnalysisUncheckedCreateInput>
  }

  /**
   * CodebaseAnalysis createMany
   */
  export type CodebaseAnalysisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CodebaseAnalyses.
     */
    data: CodebaseAnalysisCreateManyInput | CodebaseAnalysisCreateManyInput[]
  }

  /**
   * CodebaseAnalysis createManyAndReturn
   */
  export type CodebaseAnalysisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodebaseAnalysis
     */
    select?: CodebaseAnalysisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CodebaseAnalysis
     */
    omit?: CodebaseAnalysisOmit<ExtArgs> | null
    /**
     * The data used to create many CodebaseAnalyses.
     */
    data: CodebaseAnalysisCreateManyInput | CodebaseAnalysisCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodebaseAnalysisIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CodebaseAnalysis update
   */
  export type CodebaseAnalysisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodebaseAnalysis
     */
    select?: CodebaseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodebaseAnalysis
     */
    omit?: CodebaseAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodebaseAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to update a CodebaseAnalysis.
     */
    data: XOR<CodebaseAnalysisUpdateInput, CodebaseAnalysisUncheckedUpdateInput>
    /**
     * Choose, which CodebaseAnalysis to update.
     */
    where: CodebaseAnalysisWhereUniqueInput
  }

  /**
   * CodebaseAnalysis updateMany
   */
  export type CodebaseAnalysisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CodebaseAnalyses.
     */
    data: XOR<CodebaseAnalysisUpdateManyMutationInput, CodebaseAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which CodebaseAnalyses to update
     */
    where?: CodebaseAnalysisWhereInput
    /**
     * Limit how many CodebaseAnalyses to update.
     */
    limit?: number
  }

  /**
   * CodebaseAnalysis updateManyAndReturn
   */
  export type CodebaseAnalysisUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodebaseAnalysis
     */
    select?: CodebaseAnalysisSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CodebaseAnalysis
     */
    omit?: CodebaseAnalysisOmit<ExtArgs> | null
    /**
     * The data used to update CodebaseAnalyses.
     */
    data: XOR<CodebaseAnalysisUpdateManyMutationInput, CodebaseAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which CodebaseAnalyses to update
     */
    where?: CodebaseAnalysisWhereInput
    /**
     * Limit how many CodebaseAnalyses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodebaseAnalysisIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CodebaseAnalysis upsert
   */
  export type CodebaseAnalysisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodebaseAnalysis
     */
    select?: CodebaseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodebaseAnalysis
     */
    omit?: CodebaseAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodebaseAnalysisInclude<ExtArgs> | null
    /**
     * The filter to search for the CodebaseAnalysis to update in case it exists.
     */
    where: CodebaseAnalysisWhereUniqueInput
    /**
     * In case the CodebaseAnalysis found by the `where` argument doesn't exist, create a new CodebaseAnalysis with this data.
     */
    create: XOR<CodebaseAnalysisCreateInput, CodebaseAnalysisUncheckedCreateInput>
    /**
     * In case the CodebaseAnalysis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CodebaseAnalysisUpdateInput, CodebaseAnalysisUncheckedUpdateInput>
  }

  /**
   * CodebaseAnalysis delete
   */
  export type CodebaseAnalysisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodebaseAnalysis
     */
    select?: CodebaseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodebaseAnalysis
     */
    omit?: CodebaseAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodebaseAnalysisInclude<ExtArgs> | null
    /**
     * Filter which CodebaseAnalysis to delete.
     */
    where: CodebaseAnalysisWhereUniqueInput
  }

  /**
   * CodebaseAnalysis deleteMany
   */
  export type CodebaseAnalysisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CodebaseAnalyses to delete
     */
    where?: CodebaseAnalysisWhereInput
    /**
     * Limit how many CodebaseAnalyses to delete.
     */
    limit?: number
  }

  /**
   * CodebaseAnalysis without action
   */
  export type CodebaseAnalysisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CodebaseAnalysis
     */
    select?: CodebaseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CodebaseAnalysis
     */
    omit?: CodebaseAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CodebaseAnalysisInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TaskScalarFieldEnum: {
    taskId: 'taskId',
    name: 'name',
    status: 'status',
    creationDate: 'creationDate',
    completionDate: 'completionDate',
    owner: 'owner',
    currentMode: 'currentMode',
    priority: 'priority',
    dependencies: 'dependencies',
    redelegationCount: 'redelegationCount',
    gitBranch: 'gitBranch'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const TaskDescriptionScalarFieldEnum: {
    taskId: 'taskId',
    description: 'description',
    businessRequirements: 'businessRequirements',
    technicalRequirements: 'technicalRequirements',
    acceptanceCriteria: 'acceptanceCriteria',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskDescriptionScalarFieldEnum = (typeof TaskDescriptionScalarFieldEnum)[keyof typeof TaskDescriptionScalarFieldEnum]


  export const ImplementationPlanScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    overview: 'overview',
    approach: 'approach',
    technicalDecisions: 'technicalDecisions',
    filesToModify: 'filesToModify',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy'
  };

  export type ImplementationPlanScalarFieldEnum = (typeof ImplementationPlanScalarFieldEnum)[keyof typeof ImplementationPlanScalarFieldEnum]


  export const SubtaskScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    planId: 'planId',
    name: 'name',
    description: 'description',
    sequenceNumber: 'sequenceNumber',
    status: 'status',
    assignedTo: 'assignedTo',
    estimatedDuration: 'estimatedDuration',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    batchId: 'batchId',
    batchTitle: 'batchTitle'
  };

  export type SubtaskScalarFieldEnum = (typeof SubtaskScalarFieldEnum)[keyof typeof SubtaskScalarFieldEnum]


  export const DelegationRecordScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    subtaskId: 'subtaskId',
    fromMode: 'fromMode',
    toMode: 'toMode',
    delegationTimestamp: 'delegationTimestamp',
    completionTimestamp: 'completionTimestamp',
    success: 'success',
    rejectionReason: 'rejectionReason',
    redelegationCount: 'redelegationCount'
  };

  export type DelegationRecordScalarFieldEnum = (typeof DelegationRecordScalarFieldEnum)[keyof typeof DelegationRecordScalarFieldEnum]


  export const ResearchReportScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    title: 'title',
    summary: 'summary',
    findings: 'findings',
    recommendations: 'recommendations',
    references: 'references',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ResearchReportScalarFieldEnum = (typeof ResearchReportScalarFieldEnum)[keyof typeof ResearchReportScalarFieldEnum]


  export const CodeReviewScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    status: 'status',
    summary: 'summary',
    strengths: 'strengths',
    issues: 'issues',
    acceptanceCriteriaVerification: 'acceptanceCriteriaVerification',
    manualTestingResults: 'manualTestingResults',
    requiredChanges: 'requiredChanges',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CodeReviewScalarFieldEnum = (typeof CodeReviewScalarFieldEnum)[keyof typeof CodeReviewScalarFieldEnum]


  export const CompletionReportScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    summary: 'summary',
    filesModified: 'filesModified',
    delegationSummary: 'delegationSummary',
    acceptanceCriteriaVerification: 'acceptanceCriteriaVerification',
    createdAt: 'createdAt'
  };

  export type CompletionReportScalarFieldEnum = (typeof CompletionReportScalarFieldEnum)[keyof typeof CompletionReportScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    subtaskId: 'subtaskId',
    mode: 'mode',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const WorkflowTransitionScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    fromMode: 'fromMode',
    toMode: 'toMode',
    transitionTimestamp: 'transitionTimestamp',
    reason: 'reason'
  };

  export type WorkflowTransitionScalarFieldEnum = (typeof WorkflowTransitionScalarFieldEnum)[keyof typeof WorkflowTransitionScalarFieldEnum]


  export const CodebaseAnalysisScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    architectureFindings: 'architectureFindings',
    problemsIdentified: 'problemsIdentified',
    implementationContext: 'implementationContext',
    integrationPoints: 'integrationPoints',
    qualityAssessment: 'qualityAssessment',
    filesCovered: 'filesCovered',
    technologyStack: 'technologyStack',
    analyzedAt: 'analyzedAt',
    updatedAt: 'updatedAt',
    analyzedBy: 'analyzedBy',
    analysisVersion: 'analysisVersion'
  };

  export type CodebaseAnalysisScalarFieldEnum = (typeof CodebaseAnalysisScalarFieldEnum)[keyof typeof CodebaseAnalysisScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    taskId?: StringFilter<"Task"> | string
    name?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    creationDate?: DateTimeFilter<"Task"> | Date | string
    completionDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    owner?: StringNullableFilter<"Task"> | string | null
    currentMode?: StringNullableFilter<"Task"> | string | null
    priority?: StringNullableFilter<"Task"> | string | null
    dependencies?: JsonNullableFilter<"Task">
    redelegationCount?: IntFilter<"Task"> | number
    gitBranch?: StringNullableFilter<"Task"> | string | null
    taskDescription?: XOR<TaskDescriptionNullableScalarRelationFilter, TaskDescriptionWhereInput> | null
    implementationPlans?: ImplementationPlanListRelationFilter
    subtasks?: SubtaskListRelationFilter
    delegationRecords?: DelegationRecordListRelationFilter
    researchReports?: ResearchReportListRelationFilter
    codeReviews?: CodeReviewListRelationFilter
    completionReports?: CompletionReportListRelationFilter
    comments?: CommentListRelationFilter
    workflowTransitions?: WorkflowTransitionListRelationFilter
    codebaseAnalysis?: XOR<CodebaseAnalysisNullableScalarRelationFilter, CodebaseAnalysisWhereInput> | null
  }

  export type TaskOrderByWithRelationInput = {
    taskId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    creationDate?: SortOrder
    completionDate?: SortOrderInput | SortOrder
    owner?: SortOrderInput | SortOrder
    currentMode?: SortOrderInput | SortOrder
    priority?: SortOrderInput | SortOrder
    dependencies?: SortOrderInput | SortOrder
    redelegationCount?: SortOrder
    gitBranch?: SortOrderInput | SortOrder
    taskDescription?: TaskDescriptionOrderByWithRelationInput
    implementationPlans?: ImplementationPlanOrderByRelationAggregateInput
    subtasks?: SubtaskOrderByRelationAggregateInput
    delegationRecords?: DelegationRecordOrderByRelationAggregateInput
    researchReports?: ResearchReportOrderByRelationAggregateInput
    codeReviews?: CodeReviewOrderByRelationAggregateInput
    completionReports?: CompletionReportOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    workflowTransitions?: WorkflowTransitionOrderByRelationAggregateInput
    codebaseAnalysis?: CodebaseAnalysisOrderByWithRelationInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    taskId?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    name?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    creationDate?: DateTimeFilter<"Task"> | Date | string
    completionDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    owner?: StringNullableFilter<"Task"> | string | null
    currentMode?: StringNullableFilter<"Task"> | string | null
    priority?: StringNullableFilter<"Task"> | string | null
    dependencies?: JsonNullableFilter<"Task">
    redelegationCount?: IntFilter<"Task"> | number
    gitBranch?: StringNullableFilter<"Task"> | string | null
    taskDescription?: XOR<TaskDescriptionNullableScalarRelationFilter, TaskDescriptionWhereInput> | null
    implementationPlans?: ImplementationPlanListRelationFilter
    subtasks?: SubtaskListRelationFilter
    delegationRecords?: DelegationRecordListRelationFilter
    researchReports?: ResearchReportListRelationFilter
    codeReviews?: CodeReviewListRelationFilter
    completionReports?: CompletionReportListRelationFilter
    comments?: CommentListRelationFilter
    workflowTransitions?: WorkflowTransitionListRelationFilter
    codebaseAnalysis?: XOR<CodebaseAnalysisNullableScalarRelationFilter, CodebaseAnalysisWhereInput> | null
  }, "taskId">

  export type TaskOrderByWithAggregationInput = {
    taskId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    creationDate?: SortOrder
    completionDate?: SortOrderInput | SortOrder
    owner?: SortOrderInput | SortOrder
    currentMode?: SortOrderInput | SortOrder
    priority?: SortOrderInput | SortOrder
    dependencies?: SortOrderInput | SortOrder
    redelegationCount?: SortOrder
    gitBranch?: SortOrderInput | SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    taskId?: StringWithAggregatesFilter<"Task"> | string
    name?: StringWithAggregatesFilter<"Task"> | string
    status?: StringWithAggregatesFilter<"Task"> | string
    creationDate?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    completionDate?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    owner?: StringNullableWithAggregatesFilter<"Task"> | string | null
    currentMode?: StringNullableWithAggregatesFilter<"Task"> | string | null
    priority?: StringNullableWithAggregatesFilter<"Task"> | string | null
    dependencies?: JsonNullableWithAggregatesFilter<"Task">
    redelegationCount?: IntWithAggregatesFilter<"Task"> | number
    gitBranch?: StringNullableWithAggregatesFilter<"Task"> | string | null
  }

  export type TaskDescriptionWhereInput = {
    AND?: TaskDescriptionWhereInput | TaskDescriptionWhereInput[]
    OR?: TaskDescriptionWhereInput[]
    NOT?: TaskDescriptionWhereInput | TaskDescriptionWhereInput[]
    taskId?: StringFilter<"TaskDescription"> | string
    description?: StringFilter<"TaskDescription"> | string
    businessRequirements?: StringFilter<"TaskDescription"> | string
    technicalRequirements?: StringFilter<"TaskDescription"> | string
    acceptanceCriteria?: JsonFilter<"TaskDescription">
    createdAt?: DateTimeFilter<"TaskDescription"> | Date | string
    updatedAt?: DateTimeFilter<"TaskDescription"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }

  export type TaskDescriptionOrderByWithRelationInput = {
    taskId?: SortOrder
    description?: SortOrder
    businessRequirements?: SortOrder
    technicalRequirements?: SortOrder
    acceptanceCriteria?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    task?: TaskOrderByWithRelationInput
  }

  export type TaskDescriptionWhereUniqueInput = Prisma.AtLeast<{
    taskId?: string
    AND?: TaskDescriptionWhereInput | TaskDescriptionWhereInput[]
    OR?: TaskDescriptionWhereInput[]
    NOT?: TaskDescriptionWhereInput | TaskDescriptionWhereInput[]
    description?: StringFilter<"TaskDescription"> | string
    businessRequirements?: StringFilter<"TaskDescription"> | string
    technicalRequirements?: StringFilter<"TaskDescription"> | string
    acceptanceCriteria?: JsonFilter<"TaskDescription">
    createdAt?: DateTimeFilter<"TaskDescription"> | Date | string
    updatedAt?: DateTimeFilter<"TaskDescription"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }, "taskId">

  export type TaskDescriptionOrderByWithAggregationInput = {
    taskId?: SortOrder
    description?: SortOrder
    businessRequirements?: SortOrder
    technicalRequirements?: SortOrder
    acceptanceCriteria?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskDescriptionCountOrderByAggregateInput
    _max?: TaskDescriptionMaxOrderByAggregateInput
    _min?: TaskDescriptionMinOrderByAggregateInput
  }

  export type TaskDescriptionScalarWhereWithAggregatesInput = {
    AND?: TaskDescriptionScalarWhereWithAggregatesInput | TaskDescriptionScalarWhereWithAggregatesInput[]
    OR?: TaskDescriptionScalarWhereWithAggregatesInput[]
    NOT?: TaskDescriptionScalarWhereWithAggregatesInput | TaskDescriptionScalarWhereWithAggregatesInput[]
    taskId?: StringWithAggregatesFilter<"TaskDescription"> | string
    description?: StringWithAggregatesFilter<"TaskDescription"> | string
    businessRequirements?: StringWithAggregatesFilter<"TaskDescription"> | string
    technicalRequirements?: StringWithAggregatesFilter<"TaskDescription"> | string
    acceptanceCriteria?: JsonWithAggregatesFilter<"TaskDescription">
    createdAt?: DateTimeWithAggregatesFilter<"TaskDescription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TaskDescription"> | Date | string
  }

  export type ImplementationPlanWhereInput = {
    AND?: ImplementationPlanWhereInput | ImplementationPlanWhereInput[]
    OR?: ImplementationPlanWhereInput[]
    NOT?: ImplementationPlanWhereInput | ImplementationPlanWhereInput[]
    id?: IntFilter<"ImplementationPlan"> | number
    taskId?: StringFilter<"ImplementationPlan"> | string
    overview?: StringFilter<"ImplementationPlan"> | string
    approach?: StringFilter<"ImplementationPlan"> | string
    technicalDecisions?: StringFilter<"ImplementationPlan"> | string
    filesToModify?: JsonFilter<"ImplementationPlan">
    createdAt?: DateTimeFilter<"ImplementationPlan"> | Date | string
    updatedAt?: DateTimeFilter<"ImplementationPlan"> | Date | string
    createdBy?: StringFilter<"ImplementationPlan"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    subtasks?: SubtaskListRelationFilter
  }

  export type ImplementationPlanOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    overview?: SortOrder
    approach?: SortOrder
    technicalDecisions?: SortOrder
    filesToModify?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    task?: TaskOrderByWithRelationInput
    subtasks?: SubtaskOrderByRelationAggregateInput
  }

  export type ImplementationPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ImplementationPlanWhereInput | ImplementationPlanWhereInput[]
    OR?: ImplementationPlanWhereInput[]
    NOT?: ImplementationPlanWhereInput | ImplementationPlanWhereInput[]
    taskId?: StringFilter<"ImplementationPlan"> | string
    overview?: StringFilter<"ImplementationPlan"> | string
    approach?: StringFilter<"ImplementationPlan"> | string
    technicalDecisions?: StringFilter<"ImplementationPlan"> | string
    filesToModify?: JsonFilter<"ImplementationPlan">
    createdAt?: DateTimeFilter<"ImplementationPlan"> | Date | string
    updatedAt?: DateTimeFilter<"ImplementationPlan"> | Date | string
    createdBy?: StringFilter<"ImplementationPlan"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    subtasks?: SubtaskListRelationFilter
  }, "id">

  export type ImplementationPlanOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    overview?: SortOrder
    approach?: SortOrder
    technicalDecisions?: SortOrder
    filesToModify?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    _count?: ImplementationPlanCountOrderByAggregateInput
    _avg?: ImplementationPlanAvgOrderByAggregateInput
    _max?: ImplementationPlanMaxOrderByAggregateInput
    _min?: ImplementationPlanMinOrderByAggregateInput
    _sum?: ImplementationPlanSumOrderByAggregateInput
  }

  export type ImplementationPlanScalarWhereWithAggregatesInput = {
    AND?: ImplementationPlanScalarWhereWithAggregatesInput | ImplementationPlanScalarWhereWithAggregatesInput[]
    OR?: ImplementationPlanScalarWhereWithAggregatesInput[]
    NOT?: ImplementationPlanScalarWhereWithAggregatesInput | ImplementationPlanScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ImplementationPlan"> | number
    taskId?: StringWithAggregatesFilter<"ImplementationPlan"> | string
    overview?: StringWithAggregatesFilter<"ImplementationPlan"> | string
    approach?: StringWithAggregatesFilter<"ImplementationPlan"> | string
    technicalDecisions?: StringWithAggregatesFilter<"ImplementationPlan"> | string
    filesToModify?: JsonWithAggregatesFilter<"ImplementationPlan">
    createdAt?: DateTimeWithAggregatesFilter<"ImplementationPlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ImplementationPlan"> | Date | string
    createdBy?: StringWithAggregatesFilter<"ImplementationPlan"> | string
  }

  export type SubtaskWhereInput = {
    AND?: SubtaskWhereInput | SubtaskWhereInput[]
    OR?: SubtaskWhereInput[]
    NOT?: SubtaskWhereInput | SubtaskWhereInput[]
    id?: IntFilter<"Subtask"> | number
    taskId?: StringFilter<"Subtask"> | string
    planId?: IntFilter<"Subtask"> | number
    name?: StringFilter<"Subtask"> | string
    description?: StringFilter<"Subtask"> | string
    sequenceNumber?: IntFilter<"Subtask"> | number
    status?: StringFilter<"Subtask"> | string
    assignedTo?: StringNullableFilter<"Subtask"> | string | null
    estimatedDuration?: StringNullableFilter<"Subtask"> | string | null
    startedAt?: DateTimeNullableFilter<"Subtask"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Subtask"> | Date | string | null
    batchId?: StringNullableFilter<"Subtask"> | string | null
    batchTitle?: StringNullableFilter<"Subtask"> | string | null
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    plan?: XOR<ImplementationPlanScalarRelationFilter, ImplementationPlanWhereInput>
    delegationRecords?: DelegationRecordListRelationFilter
    comments?: CommentListRelationFilter
  }

  export type SubtaskOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    planId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sequenceNumber?: SortOrder
    status?: SortOrder
    assignedTo?: SortOrderInput | SortOrder
    estimatedDuration?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    batchId?: SortOrderInput | SortOrder
    batchTitle?: SortOrderInput | SortOrder
    task?: TaskOrderByWithRelationInput
    plan?: ImplementationPlanOrderByWithRelationInput
    delegationRecords?: DelegationRecordOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
  }

  export type SubtaskWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SubtaskWhereInput | SubtaskWhereInput[]
    OR?: SubtaskWhereInput[]
    NOT?: SubtaskWhereInput | SubtaskWhereInput[]
    taskId?: StringFilter<"Subtask"> | string
    planId?: IntFilter<"Subtask"> | number
    name?: StringFilter<"Subtask"> | string
    description?: StringFilter<"Subtask"> | string
    sequenceNumber?: IntFilter<"Subtask"> | number
    status?: StringFilter<"Subtask"> | string
    assignedTo?: StringNullableFilter<"Subtask"> | string | null
    estimatedDuration?: StringNullableFilter<"Subtask"> | string | null
    startedAt?: DateTimeNullableFilter<"Subtask"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Subtask"> | Date | string | null
    batchId?: StringNullableFilter<"Subtask"> | string | null
    batchTitle?: StringNullableFilter<"Subtask"> | string | null
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    plan?: XOR<ImplementationPlanScalarRelationFilter, ImplementationPlanWhereInput>
    delegationRecords?: DelegationRecordListRelationFilter
    comments?: CommentListRelationFilter
  }, "id">

  export type SubtaskOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    planId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sequenceNumber?: SortOrder
    status?: SortOrder
    assignedTo?: SortOrderInput | SortOrder
    estimatedDuration?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    batchId?: SortOrderInput | SortOrder
    batchTitle?: SortOrderInput | SortOrder
    _count?: SubtaskCountOrderByAggregateInput
    _avg?: SubtaskAvgOrderByAggregateInput
    _max?: SubtaskMaxOrderByAggregateInput
    _min?: SubtaskMinOrderByAggregateInput
    _sum?: SubtaskSumOrderByAggregateInput
  }

  export type SubtaskScalarWhereWithAggregatesInput = {
    AND?: SubtaskScalarWhereWithAggregatesInput | SubtaskScalarWhereWithAggregatesInput[]
    OR?: SubtaskScalarWhereWithAggregatesInput[]
    NOT?: SubtaskScalarWhereWithAggregatesInput | SubtaskScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Subtask"> | number
    taskId?: StringWithAggregatesFilter<"Subtask"> | string
    planId?: IntWithAggregatesFilter<"Subtask"> | number
    name?: StringWithAggregatesFilter<"Subtask"> | string
    description?: StringWithAggregatesFilter<"Subtask"> | string
    sequenceNumber?: IntWithAggregatesFilter<"Subtask"> | number
    status?: StringWithAggregatesFilter<"Subtask"> | string
    assignedTo?: StringNullableWithAggregatesFilter<"Subtask"> | string | null
    estimatedDuration?: StringNullableWithAggregatesFilter<"Subtask"> | string | null
    startedAt?: DateTimeNullableWithAggregatesFilter<"Subtask"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"Subtask"> | Date | string | null
    batchId?: StringNullableWithAggregatesFilter<"Subtask"> | string | null
    batchTitle?: StringNullableWithAggregatesFilter<"Subtask"> | string | null
  }

  export type DelegationRecordWhereInput = {
    AND?: DelegationRecordWhereInput | DelegationRecordWhereInput[]
    OR?: DelegationRecordWhereInput[]
    NOT?: DelegationRecordWhereInput | DelegationRecordWhereInput[]
    id?: IntFilter<"DelegationRecord"> | number
    taskId?: StringFilter<"DelegationRecord"> | string
    subtaskId?: IntNullableFilter<"DelegationRecord"> | number | null
    fromMode?: StringFilter<"DelegationRecord"> | string
    toMode?: StringFilter<"DelegationRecord"> | string
    delegationTimestamp?: DateTimeFilter<"DelegationRecord"> | Date | string
    completionTimestamp?: DateTimeNullableFilter<"DelegationRecord"> | Date | string | null
    success?: BoolNullableFilter<"DelegationRecord"> | boolean | null
    rejectionReason?: StringNullableFilter<"DelegationRecord"> | string | null
    redelegationCount?: IntFilter<"DelegationRecord"> | number
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    subtask?: XOR<SubtaskNullableScalarRelationFilter, SubtaskWhereInput> | null
  }

  export type DelegationRecordOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    subtaskId?: SortOrderInput | SortOrder
    fromMode?: SortOrder
    toMode?: SortOrder
    delegationTimestamp?: SortOrder
    completionTimestamp?: SortOrderInput | SortOrder
    success?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    redelegationCount?: SortOrder
    task?: TaskOrderByWithRelationInput
    subtask?: SubtaskOrderByWithRelationInput
  }

  export type DelegationRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DelegationRecordWhereInput | DelegationRecordWhereInput[]
    OR?: DelegationRecordWhereInput[]
    NOT?: DelegationRecordWhereInput | DelegationRecordWhereInput[]
    taskId?: StringFilter<"DelegationRecord"> | string
    subtaskId?: IntNullableFilter<"DelegationRecord"> | number | null
    fromMode?: StringFilter<"DelegationRecord"> | string
    toMode?: StringFilter<"DelegationRecord"> | string
    delegationTimestamp?: DateTimeFilter<"DelegationRecord"> | Date | string
    completionTimestamp?: DateTimeNullableFilter<"DelegationRecord"> | Date | string | null
    success?: BoolNullableFilter<"DelegationRecord"> | boolean | null
    rejectionReason?: StringNullableFilter<"DelegationRecord"> | string | null
    redelegationCount?: IntFilter<"DelegationRecord"> | number
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    subtask?: XOR<SubtaskNullableScalarRelationFilter, SubtaskWhereInput> | null
  }, "id">

  export type DelegationRecordOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    subtaskId?: SortOrderInput | SortOrder
    fromMode?: SortOrder
    toMode?: SortOrder
    delegationTimestamp?: SortOrder
    completionTimestamp?: SortOrderInput | SortOrder
    success?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    redelegationCount?: SortOrder
    _count?: DelegationRecordCountOrderByAggregateInput
    _avg?: DelegationRecordAvgOrderByAggregateInput
    _max?: DelegationRecordMaxOrderByAggregateInput
    _min?: DelegationRecordMinOrderByAggregateInput
    _sum?: DelegationRecordSumOrderByAggregateInput
  }

  export type DelegationRecordScalarWhereWithAggregatesInput = {
    AND?: DelegationRecordScalarWhereWithAggregatesInput | DelegationRecordScalarWhereWithAggregatesInput[]
    OR?: DelegationRecordScalarWhereWithAggregatesInput[]
    NOT?: DelegationRecordScalarWhereWithAggregatesInput | DelegationRecordScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DelegationRecord"> | number
    taskId?: StringWithAggregatesFilter<"DelegationRecord"> | string
    subtaskId?: IntNullableWithAggregatesFilter<"DelegationRecord"> | number | null
    fromMode?: StringWithAggregatesFilter<"DelegationRecord"> | string
    toMode?: StringWithAggregatesFilter<"DelegationRecord"> | string
    delegationTimestamp?: DateTimeWithAggregatesFilter<"DelegationRecord"> | Date | string
    completionTimestamp?: DateTimeNullableWithAggregatesFilter<"DelegationRecord"> | Date | string | null
    success?: BoolNullableWithAggregatesFilter<"DelegationRecord"> | boolean | null
    rejectionReason?: StringNullableWithAggregatesFilter<"DelegationRecord"> | string | null
    redelegationCount?: IntWithAggregatesFilter<"DelegationRecord"> | number
  }

  export type ResearchReportWhereInput = {
    AND?: ResearchReportWhereInput | ResearchReportWhereInput[]
    OR?: ResearchReportWhereInput[]
    NOT?: ResearchReportWhereInput | ResearchReportWhereInput[]
    id?: IntFilter<"ResearchReport"> | number
    taskId?: StringFilter<"ResearchReport"> | string
    title?: StringFilter<"ResearchReport"> | string
    summary?: StringFilter<"ResearchReport"> | string
    findings?: StringFilter<"ResearchReport"> | string
    recommendations?: StringFilter<"ResearchReport"> | string
    references?: JsonFilter<"ResearchReport">
    createdAt?: DateTimeFilter<"ResearchReport"> | Date | string
    updatedAt?: DateTimeFilter<"ResearchReport"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }

  export type ResearchReportOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    findings?: SortOrder
    recommendations?: SortOrder
    references?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    task?: TaskOrderByWithRelationInput
  }

  export type ResearchReportWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ResearchReportWhereInput | ResearchReportWhereInput[]
    OR?: ResearchReportWhereInput[]
    NOT?: ResearchReportWhereInput | ResearchReportWhereInput[]
    taskId?: StringFilter<"ResearchReport"> | string
    title?: StringFilter<"ResearchReport"> | string
    summary?: StringFilter<"ResearchReport"> | string
    findings?: StringFilter<"ResearchReport"> | string
    recommendations?: StringFilter<"ResearchReport"> | string
    references?: JsonFilter<"ResearchReport">
    createdAt?: DateTimeFilter<"ResearchReport"> | Date | string
    updatedAt?: DateTimeFilter<"ResearchReport"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }, "id">

  export type ResearchReportOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    findings?: SortOrder
    recommendations?: SortOrder
    references?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ResearchReportCountOrderByAggregateInput
    _avg?: ResearchReportAvgOrderByAggregateInput
    _max?: ResearchReportMaxOrderByAggregateInput
    _min?: ResearchReportMinOrderByAggregateInput
    _sum?: ResearchReportSumOrderByAggregateInput
  }

  export type ResearchReportScalarWhereWithAggregatesInput = {
    AND?: ResearchReportScalarWhereWithAggregatesInput | ResearchReportScalarWhereWithAggregatesInput[]
    OR?: ResearchReportScalarWhereWithAggregatesInput[]
    NOT?: ResearchReportScalarWhereWithAggregatesInput | ResearchReportScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ResearchReport"> | number
    taskId?: StringWithAggregatesFilter<"ResearchReport"> | string
    title?: StringWithAggregatesFilter<"ResearchReport"> | string
    summary?: StringWithAggregatesFilter<"ResearchReport"> | string
    findings?: StringWithAggregatesFilter<"ResearchReport"> | string
    recommendations?: StringWithAggregatesFilter<"ResearchReport"> | string
    references?: JsonWithAggregatesFilter<"ResearchReport">
    createdAt?: DateTimeWithAggregatesFilter<"ResearchReport"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ResearchReport"> | Date | string
  }

  export type CodeReviewWhereInput = {
    AND?: CodeReviewWhereInput | CodeReviewWhereInput[]
    OR?: CodeReviewWhereInput[]
    NOT?: CodeReviewWhereInput | CodeReviewWhereInput[]
    id?: IntFilter<"CodeReview"> | number
    taskId?: StringFilter<"CodeReview"> | string
    status?: StringFilter<"CodeReview"> | string
    summary?: StringFilter<"CodeReview"> | string
    strengths?: StringFilter<"CodeReview"> | string
    issues?: StringFilter<"CodeReview"> | string
    acceptanceCriteriaVerification?: JsonFilter<"CodeReview">
    manualTestingResults?: StringFilter<"CodeReview"> | string
    requiredChanges?: StringNullableFilter<"CodeReview"> | string | null
    createdAt?: DateTimeFilter<"CodeReview"> | Date | string
    updatedAt?: DateTimeFilter<"CodeReview"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }

  export type CodeReviewOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    status?: SortOrder
    summary?: SortOrder
    strengths?: SortOrder
    issues?: SortOrder
    acceptanceCriteriaVerification?: SortOrder
    manualTestingResults?: SortOrder
    requiredChanges?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    task?: TaskOrderByWithRelationInput
  }

  export type CodeReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CodeReviewWhereInput | CodeReviewWhereInput[]
    OR?: CodeReviewWhereInput[]
    NOT?: CodeReviewWhereInput | CodeReviewWhereInput[]
    taskId?: StringFilter<"CodeReview"> | string
    status?: StringFilter<"CodeReview"> | string
    summary?: StringFilter<"CodeReview"> | string
    strengths?: StringFilter<"CodeReview"> | string
    issues?: StringFilter<"CodeReview"> | string
    acceptanceCriteriaVerification?: JsonFilter<"CodeReview">
    manualTestingResults?: StringFilter<"CodeReview"> | string
    requiredChanges?: StringNullableFilter<"CodeReview"> | string | null
    createdAt?: DateTimeFilter<"CodeReview"> | Date | string
    updatedAt?: DateTimeFilter<"CodeReview"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }, "id">

  export type CodeReviewOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    status?: SortOrder
    summary?: SortOrder
    strengths?: SortOrder
    issues?: SortOrder
    acceptanceCriteriaVerification?: SortOrder
    manualTestingResults?: SortOrder
    requiredChanges?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CodeReviewCountOrderByAggregateInput
    _avg?: CodeReviewAvgOrderByAggregateInput
    _max?: CodeReviewMaxOrderByAggregateInput
    _min?: CodeReviewMinOrderByAggregateInput
    _sum?: CodeReviewSumOrderByAggregateInput
  }

  export type CodeReviewScalarWhereWithAggregatesInput = {
    AND?: CodeReviewScalarWhereWithAggregatesInput | CodeReviewScalarWhereWithAggregatesInput[]
    OR?: CodeReviewScalarWhereWithAggregatesInput[]
    NOT?: CodeReviewScalarWhereWithAggregatesInput | CodeReviewScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CodeReview"> | number
    taskId?: StringWithAggregatesFilter<"CodeReview"> | string
    status?: StringWithAggregatesFilter<"CodeReview"> | string
    summary?: StringWithAggregatesFilter<"CodeReview"> | string
    strengths?: StringWithAggregatesFilter<"CodeReview"> | string
    issues?: StringWithAggregatesFilter<"CodeReview"> | string
    acceptanceCriteriaVerification?: JsonWithAggregatesFilter<"CodeReview">
    manualTestingResults?: StringWithAggregatesFilter<"CodeReview"> | string
    requiredChanges?: StringNullableWithAggregatesFilter<"CodeReview"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CodeReview"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CodeReview"> | Date | string
  }

  export type CompletionReportWhereInput = {
    AND?: CompletionReportWhereInput | CompletionReportWhereInput[]
    OR?: CompletionReportWhereInput[]
    NOT?: CompletionReportWhereInput | CompletionReportWhereInput[]
    id?: IntFilter<"CompletionReport"> | number
    taskId?: StringFilter<"CompletionReport"> | string
    summary?: StringFilter<"CompletionReport"> | string
    filesModified?: JsonFilter<"CompletionReport">
    delegationSummary?: StringFilter<"CompletionReport"> | string
    acceptanceCriteriaVerification?: JsonFilter<"CompletionReport">
    createdAt?: DateTimeFilter<"CompletionReport"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }

  export type CompletionReportOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    summary?: SortOrder
    filesModified?: SortOrder
    delegationSummary?: SortOrder
    acceptanceCriteriaVerification?: SortOrder
    createdAt?: SortOrder
    task?: TaskOrderByWithRelationInput
  }

  export type CompletionReportWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CompletionReportWhereInput | CompletionReportWhereInput[]
    OR?: CompletionReportWhereInput[]
    NOT?: CompletionReportWhereInput | CompletionReportWhereInput[]
    taskId?: StringFilter<"CompletionReport"> | string
    summary?: StringFilter<"CompletionReport"> | string
    filesModified?: JsonFilter<"CompletionReport">
    delegationSummary?: StringFilter<"CompletionReport"> | string
    acceptanceCriteriaVerification?: JsonFilter<"CompletionReport">
    createdAt?: DateTimeFilter<"CompletionReport"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }, "id">

  export type CompletionReportOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    summary?: SortOrder
    filesModified?: SortOrder
    delegationSummary?: SortOrder
    acceptanceCriteriaVerification?: SortOrder
    createdAt?: SortOrder
    _count?: CompletionReportCountOrderByAggregateInput
    _avg?: CompletionReportAvgOrderByAggregateInput
    _max?: CompletionReportMaxOrderByAggregateInput
    _min?: CompletionReportMinOrderByAggregateInput
    _sum?: CompletionReportSumOrderByAggregateInput
  }

  export type CompletionReportScalarWhereWithAggregatesInput = {
    AND?: CompletionReportScalarWhereWithAggregatesInput | CompletionReportScalarWhereWithAggregatesInput[]
    OR?: CompletionReportScalarWhereWithAggregatesInput[]
    NOT?: CompletionReportScalarWhereWithAggregatesInput | CompletionReportScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CompletionReport"> | number
    taskId?: StringWithAggregatesFilter<"CompletionReport"> | string
    summary?: StringWithAggregatesFilter<"CompletionReport"> | string
    filesModified?: JsonWithAggregatesFilter<"CompletionReport">
    delegationSummary?: StringWithAggregatesFilter<"CompletionReport"> | string
    acceptanceCriteriaVerification?: JsonWithAggregatesFilter<"CompletionReport">
    createdAt?: DateTimeWithAggregatesFilter<"CompletionReport"> | Date | string
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: IntFilter<"Comment"> | number
    taskId?: StringFilter<"Comment"> | string
    subtaskId?: IntNullableFilter<"Comment"> | number | null
    mode?: StringFilter<"Comment"> | string
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    subtask?: XOR<SubtaskNullableScalarRelationFilter, SubtaskWhereInput> | null
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    subtaskId?: SortOrderInput | SortOrder
    mode?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    subtask?: SubtaskOrderByWithRelationInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    taskId?: StringFilter<"Comment"> | string
    subtaskId?: IntNullableFilter<"Comment"> | number | null
    mode?: StringFilter<"Comment"> | string
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    subtask?: XOR<SubtaskNullableScalarRelationFilter, SubtaskWhereInput> | null
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    subtaskId?: SortOrderInput | SortOrder
    mode?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _avg?: CommentAvgOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
    _sum?: CommentSumOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Comment"> | number
    taskId?: StringWithAggregatesFilter<"Comment"> | string
    subtaskId?: IntNullableWithAggregatesFilter<"Comment"> | number | null
    mode?: StringWithAggregatesFilter<"Comment"> | string
    content?: StringWithAggregatesFilter<"Comment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
  }

  export type WorkflowTransitionWhereInput = {
    AND?: WorkflowTransitionWhereInput | WorkflowTransitionWhereInput[]
    OR?: WorkflowTransitionWhereInput[]
    NOT?: WorkflowTransitionWhereInput | WorkflowTransitionWhereInput[]
    id?: IntFilter<"WorkflowTransition"> | number
    taskId?: StringFilter<"WorkflowTransition"> | string
    fromMode?: StringFilter<"WorkflowTransition"> | string
    toMode?: StringFilter<"WorkflowTransition"> | string
    transitionTimestamp?: DateTimeFilter<"WorkflowTransition"> | Date | string
    reason?: StringNullableFilter<"WorkflowTransition"> | string | null
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }

  export type WorkflowTransitionOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    fromMode?: SortOrder
    toMode?: SortOrder
    transitionTimestamp?: SortOrder
    reason?: SortOrderInput | SortOrder
    task?: TaskOrderByWithRelationInput
  }

  export type WorkflowTransitionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: WorkflowTransitionWhereInput | WorkflowTransitionWhereInput[]
    OR?: WorkflowTransitionWhereInput[]
    NOT?: WorkflowTransitionWhereInput | WorkflowTransitionWhereInput[]
    taskId?: StringFilter<"WorkflowTransition"> | string
    fromMode?: StringFilter<"WorkflowTransition"> | string
    toMode?: StringFilter<"WorkflowTransition"> | string
    transitionTimestamp?: DateTimeFilter<"WorkflowTransition"> | Date | string
    reason?: StringNullableFilter<"WorkflowTransition"> | string | null
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }, "id">

  export type WorkflowTransitionOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    fromMode?: SortOrder
    toMode?: SortOrder
    transitionTimestamp?: SortOrder
    reason?: SortOrderInput | SortOrder
    _count?: WorkflowTransitionCountOrderByAggregateInput
    _avg?: WorkflowTransitionAvgOrderByAggregateInput
    _max?: WorkflowTransitionMaxOrderByAggregateInput
    _min?: WorkflowTransitionMinOrderByAggregateInput
    _sum?: WorkflowTransitionSumOrderByAggregateInput
  }

  export type WorkflowTransitionScalarWhereWithAggregatesInput = {
    AND?: WorkflowTransitionScalarWhereWithAggregatesInput | WorkflowTransitionScalarWhereWithAggregatesInput[]
    OR?: WorkflowTransitionScalarWhereWithAggregatesInput[]
    NOT?: WorkflowTransitionScalarWhereWithAggregatesInput | WorkflowTransitionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"WorkflowTransition"> | number
    taskId?: StringWithAggregatesFilter<"WorkflowTransition"> | string
    fromMode?: StringWithAggregatesFilter<"WorkflowTransition"> | string
    toMode?: StringWithAggregatesFilter<"WorkflowTransition"> | string
    transitionTimestamp?: DateTimeWithAggregatesFilter<"WorkflowTransition"> | Date | string
    reason?: StringNullableWithAggregatesFilter<"WorkflowTransition"> | string | null
  }

  export type CodebaseAnalysisWhereInput = {
    AND?: CodebaseAnalysisWhereInput | CodebaseAnalysisWhereInput[]
    OR?: CodebaseAnalysisWhereInput[]
    NOT?: CodebaseAnalysisWhereInput | CodebaseAnalysisWhereInput[]
    id?: IntFilter<"CodebaseAnalysis"> | number
    taskId?: StringFilter<"CodebaseAnalysis"> | string
    architectureFindings?: JsonFilter<"CodebaseAnalysis">
    problemsIdentified?: JsonFilter<"CodebaseAnalysis">
    implementationContext?: JsonFilter<"CodebaseAnalysis">
    integrationPoints?: JsonFilter<"CodebaseAnalysis">
    qualityAssessment?: JsonFilter<"CodebaseAnalysis">
    filesCovered?: JsonFilter<"CodebaseAnalysis">
    technologyStack?: JsonFilter<"CodebaseAnalysis">
    analyzedAt?: DateTimeFilter<"CodebaseAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"CodebaseAnalysis"> | Date | string
    analyzedBy?: StringFilter<"CodebaseAnalysis"> | string
    analysisVersion?: StringFilter<"CodebaseAnalysis"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }

  export type CodebaseAnalysisOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    architectureFindings?: SortOrder
    problemsIdentified?: SortOrder
    implementationContext?: SortOrder
    integrationPoints?: SortOrder
    qualityAssessment?: SortOrder
    filesCovered?: SortOrder
    technologyStack?: SortOrder
    analyzedAt?: SortOrder
    updatedAt?: SortOrder
    analyzedBy?: SortOrder
    analysisVersion?: SortOrder
    task?: TaskOrderByWithRelationInput
  }

  export type CodebaseAnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    taskId?: string
    AND?: CodebaseAnalysisWhereInput | CodebaseAnalysisWhereInput[]
    OR?: CodebaseAnalysisWhereInput[]
    NOT?: CodebaseAnalysisWhereInput | CodebaseAnalysisWhereInput[]
    architectureFindings?: JsonFilter<"CodebaseAnalysis">
    problemsIdentified?: JsonFilter<"CodebaseAnalysis">
    implementationContext?: JsonFilter<"CodebaseAnalysis">
    integrationPoints?: JsonFilter<"CodebaseAnalysis">
    qualityAssessment?: JsonFilter<"CodebaseAnalysis">
    filesCovered?: JsonFilter<"CodebaseAnalysis">
    technologyStack?: JsonFilter<"CodebaseAnalysis">
    analyzedAt?: DateTimeFilter<"CodebaseAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"CodebaseAnalysis"> | Date | string
    analyzedBy?: StringFilter<"CodebaseAnalysis"> | string
    analysisVersion?: StringFilter<"CodebaseAnalysis"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }, "id" | "taskId">

  export type CodebaseAnalysisOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    architectureFindings?: SortOrder
    problemsIdentified?: SortOrder
    implementationContext?: SortOrder
    integrationPoints?: SortOrder
    qualityAssessment?: SortOrder
    filesCovered?: SortOrder
    technologyStack?: SortOrder
    analyzedAt?: SortOrder
    updatedAt?: SortOrder
    analyzedBy?: SortOrder
    analysisVersion?: SortOrder
    _count?: CodebaseAnalysisCountOrderByAggregateInput
    _avg?: CodebaseAnalysisAvgOrderByAggregateInput
    _max?: CodebaseAnalysisMaxOrderByAggregateInput
    _min?: CodebaseAnalysisMinOrderByAggregateInput
    _sum?: CodebaseAnalysisSumOrderByAggregateInput
  }

  export type CodebaseAnalysisScalarWhereWithAggregatesInput = {
    AND?: CodebaseAnalysisScalarWhereWithAggregatesInput | CodebaseAnalysisScalarWhereWithAggregatesInput[]
    OR?: CodebaseAnalysisScalarWhereWithAggregatesInput[]
    NOT?: CodebaseAnalysisScalarWhereWithAggregatesInput | CodebaseAnalysisScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CodebaseAnalysis"> | number
    taskId?: StringWithAggregatesFilter<"CodebaseAnalysis"> | string
    architectureFindings?: JsonWithAggregatesFilter<"CodebaseAnalysis">
    problemsIdentified?: JsonWithAggregatesFilter<"CodebaseAnalysis">
    implementationContext?: JsonWithAggregatesFilter<"CodebaseAnalysis">
    integrationPoints?: JsonWithAggregatesFilter<"CodebaseAnalysis">
    qualityAssessment?: JsonWithAggregatesFilter<"CodebaseAnalysis">
    filesCovered?: JsonWithAggregatesFilter<"CodebaseAnalysis">
    technologyStack?: JsonWithAggregatesFilter<"CodebaseAnalysis">
    analyzedAt?: DateTimeWithAggregatesFilter<"CodebaseAnalysis"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CodebaseAnalysis"> | Date | string
    analyzedBy?: StringWithAggregatesFilter<"CodebaseAnalysis"> | string
    analysisVersion?: StringWithAggregatesFilter<"CodebaseAnalysis"> | string
  }

  export type TaskCreateInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportCreateNestedManyWithoutTaskInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisCreateNestedOneWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionUncheckedCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanUncheckedCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordUncheckedCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportUncheckedCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewUncheckedCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionUncheckedCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedCreateNestedOneWithoutTaskInput
  }

  export type TaskUpdateInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUpdateManyWithoutTaskNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUpdateOneWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUncheckedUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUncheckedUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUncheckedUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUncheckedUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUncheckedUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUncheckedUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedUpdateOneWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
  }

  export type TaskUpdateManyMutationInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskUncheckedUpdateManyInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskDescriptionCreateInput = {
    description: string
    businessRequirements: string
    technicalRequirements: string
    acceptanceCriteria: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    task: TaskCreateNestedOneWithoutTaskDescriptionInput
  }

  export type TaskDescriptionUncheckedCreateInput = {
    taskId: string
    description: string
    businessRequirements: string
    technicalRequirements: string
    acceptanceCriteria: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskDescriptionUpdateInput = {
    description?: StringFieldUpdateOperationsInput | string
    businessRequirements?: StringFieldUpdateOperationsInput | string
    technicalRequirements?: StringFieldUpdateOperationsInput | string
    acceptanceCriteria?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutTaskDescriptionNestedInput
  }

  export type TaskDescriptionUncheckedUpdateInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    businessRequirements?: StringFieldUpdateOperationsInput | string
    technicalRequirements?: StringFieldUpdateOperationsInput | string
    acceptanceCriteria?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskDescriptionCreateManyInput = {
    taskId: string
    description: string
    businessRequirements: string
    technicalRequirements: string
    acceptanceCriteria: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskDescriptionUpdateManyMutationInput = {
    description?: StringFieldUpdateOperationsInput | string
    businessRequirements?: StringFieldUpdateOperationsInput | string
    technicalRequirements?: StringFieldUpdateOperationsInput | string
    acceptanceCriteria?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskDescriptionUncheckedUpdateManyInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    businessRequirements?: StringFieldUpdateOperationsInput | string
    technicalRequirements?: StringFieldUpdateOperationsInput | string
    acceptanceCriteria?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImplementationPlanCreateInput = {
    overview: string
    approach: string
    technicalDecisions: string
    filesToModify: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    task: TaskCreateNestedOneWithoutImplementationPlansInput
    subtasks?: SubtaskCreateNestedManyWithoutPlanInput
  }

  export type ImplementationPlanUncheckedCreateInput = {
    id?: number
    taskId: string
    overview: string
    approach: string
    technicalDecisions: string
    filesToModify: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutPlanInput
  }

  export type ImplementationPlanUpdateInput = {
    overview?: StringFieldUpdateOperationsInput | string
    approach?: StringFieldUpdateOperationsInput | string
    technicalDecisions?: StringFieldUpdateOperationsInput | string
    filesToModify?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    task?: TaskUpdateOneRequiredWithoutImplementationPlansNestedInput
    subtasks?: SubtaskUpdateManyWithoutPlanNestedInput
  }

  export type ImplementationPlanUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    approach?: StringFieldUpdateOperationsInput | string
    technicalDecisions?: StringFieldUpdateOperationsInput | string
    filesToModify?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    subtasks?: SubtaskUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type ImplementationPlanCreateManyInput = {
    id?: number
    taskId: string
    overview: string
    approach: string
    technicalDecisions: string
    filesToModify: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
  }

  export type ImplementationPlanUpdateManyMutationInput = {
    overview?: StringFieldUpdateOperationsInput | string
    approach?: StringFieldUpdateOperationsInput | string
    technicalDecisions?: StringFieldUpdateOperationsInput | string
    filesToModify?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type ImplementationPlanUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    approach?: StringFieldUpdateOperationsInput | string
    technicalDecisions?: StringFieldUpdateOperationsInput | string
    filesToModify?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type SubtaskCreateInput = {
    name: string
    description: string
    sequenceNumber: number
    status: string
    assignedTo?: string | null
    estimatedDuration?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    batchId?: string | null
    batchTitle?: string | null
    task: TaskCreateNestedOneWithoutSubtasksInput
    plan: ImplementationPlanCreateNestedOneWithoutSubtasksInput
    delegationRecords?: DelegationRecordCreateNestedManyWithoutSubtaskInput
    comments?: CommentCreateNestedManyWithoutSubtaskInput
  }

  export type SubtaskUncheckedCreateInput = {
    id?: number
    taskId: string
    planId: number
    name: string
    description: string
    sequenceNumber: number
    status: string
    assignedTo?: string | null
    estimatedDuration?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    batchId?: string | null
    batchTitle?: string | null
    delegationRecords?: DelegationRecordUncheckedCreateNestedManyWithoutSubtaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutSubtaskInput
  }

  export type SubtaskUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDuration?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTitle?: NullableStringFieldUpdateOperationsInput | string | null
    task?: TaskUpdateOneRequiredWithoutSubtasksNestedInput
    plan?: ImplementationPlanUpdateOneRequiredWithoutSubtasksNestedInput
    delegationRecords?: DelegationRecordUpdateManyWithoutSubtaskNestedInput
    comments?: CommentUpdateManyWithoutSubtaskNestedInput
  }

  export type SubtaskUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    planId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDuration?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTitle?: NullableStringFieldUpdateOperationsInput | string | null
    delegationRecords?: DelegationRecordUncheckedUpdateManyWithoutSubtaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutSubtaskNestedInput
  }

  export type SubtaskCreateManyInput = {
    id?: number
    taskId: string
    planId: number
    name: string
    description: string
    sequenceNumber: number
    status: string
    assignedTo?: string | null
    estimatedDuration?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    batchId?: string | null
    batchTitle?: string | null
  }

  export type SubtaskUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDuration?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTitle?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubtaskUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    planId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDuration?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTitle?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DelegationRecordCreateInput = {
    fromMode: string
    toMode: string
    delegationTimestamp?: Date | string
    completionTimestamp?: Date | string | null
    success?: boolean | null
    rejectionReason?: string | null
    redelegationCount?: number
    task: TaskCreateNestedOneWithoutDelegationRecordsInput
    subtask?: SubtaskCreateNestedOneWithoutDelegationRecordsInput
  }

  export type DelegationRecordUncheckedCreateInput = {
    id?: number
    taskId: string
    subtaskId?: number | null
    fromMode: string
    toMode: string
    delegationTimestamp?: Date | string
    completionTimestamp?: Date | string | null
    success?: boolean | null
    rejectionReason?: string | null
    redelegationCount?: number
  }

  export type DelegationRecordUpdateInput = {
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    delegationTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    completionTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    success?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    redelegationCount?: IntFieldUpdateOperationsInput | number
    task?: TaskUpdateOneRequiredWithoutDelegationRecordsNestedInput
    subtask?: SubtaskUpdateOneWithoutDelegationRecordsNestedInput
  }

  export type DelegationRecordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    subtaskId?: NullableIntFieldUpdateOperationsInput | number | null
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    delegationTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    completionTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    success?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    redelegationCount?: IntFieldUpdateOperationsInput | number
  }

  export type DelegationRecordCreateManyInput = {
    id?: number
    taskId: string
    subtaskId?: number | null
    fromMode: string
    toMode: string
    delegationTimestamp?: Date | string
    completionTimestamp?: Date | string | null
    success?: boolean | null
    rejectionReason?: string | null
    redelegationCount?: number
  }

  export type DelegationRecordUpdateManyMutationInput = {
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    delegationTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    completionTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    success?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    redelegationCount?: IntFieldUpdateOperationsInput | number
  }

  export type DelegationRecordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    subtaskId?: NullableIntFieldUpdateOperationsInput | number | null
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    delegationTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    completionTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    success?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    redelegationCount?: IntFieldUpdateOperationsInput | number
  }

  export type ResearchReportCreateInput = {
    title: string
    summary: string
    findings: string
    recommendations: string
    references: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    task: TaskCreateNestedOneWithoutResearchReportsInput
  }

  export type ResearchReportUncheckedCreateInput = {
    id?: number
    taskId: string
    title: string
    summary: string
    findings: string
    recommendations: string
    references: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResearchReportUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    findings?: StringFieldUpdateOperationsInput | string
    recommendations?: StringFieldUpdateOperationsInput | string
    references?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutResearchReportsNestedInput
  }

  export type ResearchReportUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    findings?: StringFieldUpdateOperationsInput | string
    recommendations?: StringFieldUpdateOperationsInput | string
    references?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResearchReportCreateManyInput = {
    id?: number
    taskId: string
    title: string
    summary: string
    findings: string
    recommendations: string
    references: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResearchReportUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    findings?: StringFieldUpdateOperationsInput | string
    recommendations?: StringFieldUpdateOperationsInput | string
    references?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResearchReportUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    findings?: StringFieldUpdateOperationsInput | string
    recommendations?: StringFieldUpdateOperationsInput | string
    references?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeReviewCreateInput = {
    status: string
    summary: string
    strengths: string
    issues: string
    acceptanceCriteriaVerification: JsonNullValueInput | InputJsonValue
    manualTestingResults: string
    requiredChanges?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    task: TaskCreateNestedOneWithoutCodeReviewsInput
  }

  export type CodeReviewUncheckedCreateInput = {
    id?: number
    taskId: string
    status: string
    summary: string
    strengths: string
    issues: string
    acceptanceCriteriaVerification: JsonNullValueInput | InputJsonValue
    manualTestingResults: string
    requiredChanges?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CodeReviewUpdateInput = {
    status?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    strengths?: StringFieldUpdateOperationsInput | string
    issues?: StringFieldUpdateOperationsInput | string
    acceptanceCriteriaVerification?: JsonNullValueInput | InputJsonValue
    manualTestingResults?: StringFieldUpdateOperationsInput | string
    requiredChanges?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutCodeReviewsNestedInput
  }

  export type CodeReviewUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    strengths?: StringFieldUpdateOperationsInput | string
    issues?: StringFieldUpdateOperationsInput | string
    acceptanceCriteriaVerification?: JsonNullValueInput | InputJsonValue
    manualTestingResults?: StringFieldUpdateOperationsInput | string
    requiredChanges?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeReviewCreateManyInput = {
    id?: number
    taskId: string
    status: string
    summary: string
    strengths: string
    issues: string
    acceptanceCriteriaVerification: JsonNullValueInput | InputJsonValue
    manualTestingResults: string
    requiredChanges?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CodeReviewUpdateManyMutationInput = {
    status?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    strengths?: StringFieldUpdateOperationsInput | string
    issues?: StringFieldUpdateOperationsInput | string
    acceptanceCriteriaVerification?: JsonNullValueInput | InputJsonValue
    manualTestingResults?: StringFieldUpdateOperationsInput | string
    requiredChanges?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeReviewUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    strengths?: StringFieldUpdateOperationsInput | string
    issues?: StringFieldUpdateOperationsInput | string
    acceptanceCriteriaVerification?: JsonNullValueInput | InputJsonValue
    manualTestingResults?: StringFieldUpdateOperationsInput | string
    requiredChanges?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompletionReportCreateInput = {
    summary: string
    filesModified: JsonNullValueInput | InputJsonValue
    delegationSummary: string
    acceptanceCriteriaVerification: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutCompletionReportsInput
  }

  export type CompletionReportUncheckedCreateInput = {
    id?: number
    taskId: string
    summary: string
    filesModified: JsonNullValueInput | InputJsonValue
    delegationSummary: string
    acceptanceCriteriaVerification: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CompletionReportUpdateInput = {
    summary?: StringFieldUpdateOperationsInput | string
    filesModified?: JsonNullValueInput | InputJsonValue
    delegationSummary?: StringFieldUpdateOperationsInput | string
    acceptanceCriteriaVerification?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutCompletionReportsNestedInput
  }

  export type CompletionReportUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    filesModified?: JsonNullValueInput | InputJsonValue
    delegationSummary?: StringFieldUpdateOperationsInput | string
    acceptanceCriteriaVerification?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompletionReportCreateManyInput = {
    id?: number
    taskId: string
    summary: string
    filesModified: JsonNullValueInput | InputJsonValue
    delegationSummary: string
    acceptanceCriteriaVerification: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CompletionReportUpdateManyMutationInput = {
    summary?: StringFieldUpdateOperationsInput | string
    filesModified?: JsonNullValueInput | InputJsonValue
    delegationSummary?: StringFieldUpdateOperationsInput | string
    acceptanceCriteriaVerification?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompletionReportUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    filesModified?: JsonNullValueInput | InputJsonValue
    delegationSummary?: StringFieldUpdateOperationsInput | string
    acceptanceCriteriaVerification?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateInput = {
    mode: string
    content: string
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutCommentsInput
    subtask?: SubtaskCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: number
    taskId: string
    subtaskId?: number | null
    mode: string
    content: string
    createdAt?: Date | string
  }

  export type CommentUpdateInput = {
    mode?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutCommentsNestedInput
    subtask?: SubtaskUpdateOneWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    subtaskId?: NullableIntFieldUpdateOperationsInput | number | null
    mode?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateManyInput = {
    id?: number
    taskId: string
    subtaskId?: number | null
    mode: string
    content: string
    createdAt?: Date | string
  }

  export type CommentUpdateManyMutationInput = {
    mode?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    subtaskId?: NullableIntFieldUpdateOperationsInput | number | null
    mode?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowTransitionCreateInput = {
    fromMode: string
    toMode: string
    transitionTimestamp?: Date | string
    reason?: string | null
    task: TaskCreateNestedOneWithoutWorkflowTransitionsInput
  }

  export type WorkflowTransitionUncheckedCreateInput = {
    id?: number
    taskId: string
    fromMode: string
    toMode: string
    transitionTimestamp?: Date | string
    reason?: string | null
  }

  export type WorkflowTransitionUpdateInput = {
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    transitionTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    task?: TaskUpdateOneRequiredWithoutWorkflowTransitionsNestedInput
  }

  export type WorkflowTransitionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    transitionTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkflowTransitionCreateManyInput = {
    id?: number
    taskId: string
    fromMode: string
    toMode: string
    transitionTimestamp?: Date | string
    reason?: string | null
  }

  export type WorkflowTransitionUpdateManyMutationInput = {
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    transitionTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkflowTransitionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    transitionTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CodebaseAnalysisCreateInput = {
    architectureFindings: JsonNullValueInput | InputJsonValue
    problemsIdentified: JsonNullValueInput | InputJsonValue
    implementationContext: JsonNullValueInput | InputJsonValue
    integrationPoints: JsonNullValueInput | InputJsonValue
    qualityAssessment: JsonNullValueInput | InputJsonValue
    filesCovered: JsonNullValueInput | InputJsonValue
    technologyStack: JsonNullValueInput | InputJsonValue
    analyzedAt?: Date | string
    updatedAt?: Date | string
    analyzedBy: string
    analysisVersion?: string
    task: TaskCreateNestedOneWithoutCodebaseAnalysisInput
  }

  export type CodebaseAnalysisUncheckedCreateInput = {
    id?: number
    taskId: string
    architectureFindings: JsonNullValueInput | InputJsonValue
    problemsIdentified: JsonNullValueInput | InputJsonValue
    implementationContext: JsonNullValueInput | InputJsonValue
    integrationPoints: JsonNullValueInput | InputJsonValue
    qualityAssessment: JsonNullValueInput | InputJsonValue
    filesCovered: JsonNullValueInput | InputJsonValue
    technologyStack: JsonNullValueInput | InputJsonValue
    analyzedAt?: Date | string
    updatedAt?: Date | string
    analyzedBy: string
    analysisVersion?: string
  }

  export type CodebaseAnalysisUpdateInput = {
    architectureFindings?: JsonNullValueInput | InputJsonValue
    problemsIdentified?: JsonNullValueInput | InputJsonValue
    implementationContext?: JsonNullValueInput | InputJsonValue
    integrationPoints?: JsonNullValueInput | InputJsonValue
    qualityAssessment?: JsonNullValueInput | InputJsonValue
    filesCovered?: JsonNullValueInput | InputJsonValue
    technologyStack?: JsonNullValueInput | InputJsonValue
    analyzedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    analyzedBy?: StringFieldUpdateOperationsInput | string
    analysisVersion?: StringFieldUpdateOperationsInput | string
    task?: TaskUpdateOneRequiredWithoutCodebaseAnalysisNestedInput
  }

  export type CodebaseAnalysisUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    architectureFindings?: JsonNullValueInput | InputJsonValue
    problemsIdentified?: JsonNullValueInput | InputJsonValue
    implementationContext?: JsonNullValueInput | InputJsonValue
    integrationPoints?: JsonNullValueInput | InputJsonValue
    qualityAssessment?: JsonNullValueInput | InputJsonValue
    filesCovered?: JsonNullValueInput | InputJsonValue
    technologyStack?: JsonNullValueInput | InputJsonValue
    analyzedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    analyzedBy?: StringFieldUpdateOperationsInput | string
    analysisVersion?: StringFieldUpdateOperationsInput | string
  }

  export type CodebaseAnalysisCreateManyInput = {
    id?: number
    taskId: string
    architectureFindings: JsonNullValueInput | InputJsonValue
    problemsIdentified: JsonNullValueInput | InputJsonValue
    implementationContext: JsonNullValueInput | InputJsonValue
    integrationPoints: JsonNullValueInput | InputJsonValue
    qualityAssessment: JsonNullValueInput | InputJsonValue
    filesCovered: JsonNullValueInput | InputJsonValue
    technologyStack: JsonNullValueInput | InputJsonValue
    analyzedAt?: Date | string
    updatedAt?: Date | string
    analyzedBy: string
    analysisVersion?: string
  }

  export type CodebaseAnalysisUpdateManyMutationInput = {
    architectureFindings?: JsonNullValueInput | InputJsonValue
    problemsIdentified?: JsonNullValueInput | InputJsonValue
    implementationContext?: JsonNullValueInput | InputJsonValue
    integrationPoints?: JsonNullValueInput | InputJsonValue
    qualityAssessment?: JsonNullValueInput | InputJsonValue
    filesCovered?: JsonNullValueInput | InputJsonValue
    technologyStack?: JsonNullValueInput | InputJsonValue
    analyzedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    analyzedBy?: StringFieldUpdateOperationsInput | string
    analysisVersion?: StringFieldUpdateOperationsInput | string
  }

  export type CodebaseAnalysisUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    architectureFindings?: JsonNullValueInput | InputJsonValue
    problemsIdentified?: JsonNullValueInput | InputJsonValue
    implementationContext?: JsonNullValueInput | InputJsonValue
    integrationPoints?: JsonNullValueInput | InputJsonValue
    qualityAssessment?: JsonNullValueInput | InputJsonValue
    filesCovered?: JsonNullValueInput | InputJsonValue
    technologyStack?: JsonNullValueInput | InputJsonValue
    analyzedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    analyzedBy?: StringFieldUpdateOperationsInput | string
    analysisVersion?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type TaskDescriptionNullableScalarRelationFilter = {
    is?: TaskDescriptionWhereInput | null
    isNot?: TaskDescriptionWhereInput | null
  }

  export type ImplementationPlanListRelationFilter = {
    every?: ImplementationPlanWhereInput
    some?: ImplementationPlanWhereInput
    none?: ImplementationPlanWhereInput
  }

  export type SubtaskListRelationFilter = {
    every?: SubtaskWhereInput
    some?: SubtaskWhereInput
    none?: SubtaskWhereInput
  }

  export type DelegationRecordListRelationFilter = {
    every?: DelegationRecordWhereInput
    some?: DelegationRecordWhereInput
    none?: DelegationRecordWhereInput
  }

  export type ResearchReportListRelationFilter = {
    every?: ResearchReportWhereInput
    some?: ResearchReportWhereInput
    none?: ResearchReportWhereInput
  }

  export type CodeReviewListRelationFilter = {
    every?: CodeReviewWhereInput
    some?: CodeReviewWhereInput
    none?: CodeReviewWhereInput
  }

  export type CompletionReportListRelationFilter = {
    every?: CompletionReportWhereInput
    some?: CompletionReportWhereInput
    none?: CompletionReportWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type WorkflowTransitionListRelationFilter = {
    every?: WorkflowTransitionWhereInput
    some?: WorkflowTransitionWhereInput
    none?: WorkflowTransitionWhereInput
  }

  export type CodebaseAnalysisNullableScalarRelationFilter = {
    is?: CodebaseAnalysisWhereInput | null
    isNot?: CodebaseAnalysisWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ImplementationPlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubtaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DelegationRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResearchReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CodeReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompletionReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkflowTransitionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskCountOrderByAggregateInput = {
    taskId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    creationDate?: SortOrder
    completionDate?: SortOrder
    owner?: SortOrder
    currentMode?: SortOrder
    priority?: SortOrder
    dependencies?: SortOrder
    redelegationCount?: SortOrder
    gitBranch?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    redelegationCount?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    taskId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    creationDate?: SortOrder
    completionDate?: SortOrder
    owner?: SortOrder
    currentMode?: SortOrder
    priority?: SortOrder
    redelegationCount?: SortOrder
    gitBranch?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    taskId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    creationDate?: SortOrder
    completionDate?: SortOrder
    owner?: SortOrder
    currentMode?: SortOrder
    priority?: SortOrder
    redelegationCount?: SortOrder
    gitBranch?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    redelegationCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TaskScalarRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type TaskDescriptionCountOrderByAggregateInput = {
    taskId?: SortOrder
    description?: SortOrder
    businessRequirements?: SortOrder
    technicalRequirements?: SortOrder
    acceptanceCriteria?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskDescriptionMaxOrderByAggregateInput = {
    taskId?: SortOrder
    description?: SortOrder
    businessRequirements?: SortOrder
    technicalRequirements?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskDescriptionMinOrderByAggregateInput = {
    taskId?: SortOrder
    description?: SortOrder
    businessRequirements?: SortOrder
    technicalRequirements?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type ImplementationPlanCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    overview?: SortOrder
    approach?: SortOrder
    technicalDecisions?: SortOrder
    filesToModify?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
  }

  export type ImplementationPlanAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ImplementationPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    overview?: SortOrder
    approach?: SortOrder
    technicalDecisions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
  }

  export type ImplementationPlanMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    overview?: SortOrder
    approach?: SortOrder
    technicalDecisions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
  }

  export type ImplementationPlanSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ImplementationPlanScalarRelationFilter = {
    is?: ImplementationPlanWhereInput
    isNot?: ImplementationPlanWhereInput
  }

  export type SubtaskCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    planId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sequenceNumber?: SortOrder
    status?: SortOrder
    assignedTo?: SortOrder
    estimatedDuration?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    batchId?: SortOrder
    batchTitle?: SortOrder
  }

  export type SubtaskAvgOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    sequenceNumber?: SortOrder
  }

  export type SubtaskMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    planId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sequenceNumber?: SortOrder
    status?: SortOrder
    assignedTo?: SortOrder
    estimatedDuration?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    batchId?: SortOrder
    batchTitle?: SortOrder
  }

  export type SubtaskMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    planId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    sequenceNumber?: SortOrder
    status?: SortOrder
    assignedTo?: SortOrder
    estimatedDuration?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    batchId?: SortOrder
    batchTitle?: SortOrder
  }

  export type SubtaskSumOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    sequenceNumber?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type SubtaskNullableScalarRelationFilter = {
    is?: SubtaskWhereInput | null
    isNot?: SubtaskWhereInput | null
  }

  export type DelegationRecordCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    subtaskId?: SortOrder
    fromMode?: SortOrder
    toMode?: SortOrder
    delegationTimestamp?: SortOrder
    completionTimestamp?: SortOrder
    success?: SortOrder
    rejectionReason?: SortOrder
    redelegationCount?: SortOrder
  }

  export type DelegationRecordAvgOrderByAggregateInput = {
    id?: SortOrder
    subtaskId?: SortOrder
    redelegationCount?: SortOrder
  }

  export type DelegationRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    subtaskId?: SortOrder
    fromMode?: SortOrder
    toMode?: SortOrder
    delegationTimestamp?: SortOrder
    completionTimestamp?: SortOrder
    success?: SortOrder
    rejectionReason?: SortOrder
    redelegationCount?: SortOrder
  }

  export type DelegationRecordMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    subtaskId?: SortOrder
    fromMode?: SortOrder
    toMode?: SortOrder
    delegationTimestamp?: SortOrder
    completionTimestamp?: SortOrder
    success?: SortOrder
    rejectionReason?: SortOrder
    redelegationCount?: SortOrder
  }

  export type DelegationRecordSumOrderByAggregateInput = {
    id?: SortOrder
    subtaskId?: SortOrder
    redelegationCount?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type ResearchReportCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    findings?: SortOrder
    recommendations?: SortOrder
    references?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResearchReportAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ResearchReportMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    findings?: SortOrder
    recommendations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResearchReportMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    findings?: SortOrder
    recommendations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResearchReportSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CodeReviewCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    status?: SortOrder
    summary?: SortOrder
    strengths?: SortOrder
    issues?: SortOrder
    acceptanceCriteriaVerification?: SortOrder
    manualTestingResults?: SortOrder
    requiredChanges?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CodeReviewAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CodeReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    status?: SortOrder
    summary?: SortOrder
    strengths?: SortOrder
    issues?: SortOrder
    manualTestingResults?: SortOrder
    requiredChanges?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CodeReviewMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    status?: SortOrder
    summary?: SortOrder
    strengths?: SortOrder
    issues?: SortOrder
    manualTestingResults?: SortOrder
    requiredChanges?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CodeReviewSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CompletionReportCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    summary?: SortOrder
    filesModified?: SortOrder
    delegationSummary?: SortOrder
    acceptanceCriteriaVerification?: SortOrder
    createdAt?: SortOrder
  }

  export type CompletionReportAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CompletionReportMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    summary?: SortOrder
    delegationSummary?: SortOrder
    createdAt?: SortOrder
  }

  export type CompletionReportMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    summary?: SortOrder
    delegationSummary?: SortOrder
    createdAt?: SortOrder
  }

  export type CompletionReportSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    subtaskId?: SortOrder
    mode?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentAvgOrderByAggregateInput = {
    id?: SortOrder
    subtaskId?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    subtaskId?: SortOrder
    mode?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    subtaskId?: SortOrder
    mode?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentSumOrderByAggregateInput = {
    id?: SortOrder
    subtaskId?: SortOrder
  }

  export type WorkflowTransitionCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    fromMode?: SortOrder
    toMode?: SortOrder
    transitionTimestamp?: SortOrder
    reason?: SortOrder
  }

  export type WorkflowTransitionAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type WorkflowTransitionMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    fromMode?: SortOrder
    toMode?: SortOrder
    transitionTimestamp?: SortOrder
    reason?: SortOrder
  }

  export type WorkflowTransitionMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    fromMode?: SortOrder
    toMode?: SortOrder
    transitionTimestamp?: SortOrder
    reason?: SortOrder
  }

  export type WorkflowTransitionSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CodebaseAnalysisCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    architectureFindings?: SortOrder
    problemsIdentified?: SortOrder
    implementationContext?: SortOrder
    integrationPoints?: SortOrder
    qualityAssessment?: SortOrder
    filesCovered?: SortOrder
    technologyStack?: SortOrder
    analyzedAt?: SortOrder
    updatedAt?: SortOrder
    analyzedBy?: SortOrder
    analysisVersion?: SortOrder
  }

  export type CodebaseAnalysisAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CodebaseAnalysisMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    analyzedAt?: SortOrder
    updatedAt?: SortOrder
    analyzedBy?: SortOrder
    analysisVersion?: SortOrder
  }

  export type CodebaseAnalysisMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    analyzedAt?: SortOrder
    updatedAt?: SortOrder
    analyzedBy?: SortOrder
    analysisVersion?: SortOrder
  }

  export type CodebaseAnalysisSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TaskDescriptionCreateNestedOneWithoutTaskInput = {
    create?: XOR<TaskDescriptionCreateWithoutTaskInput, TaskDescriptionUncheckedCreateWithoutTaskInput>
    connectOrCreate?: TaskDescriptionCreateOrConnectWithoutTaskInput
    connect?: TaskDescriptionWhereUniqueInput
  }

  export type ImplementationPlanCreateNestedManyWithoutTaskInput = {
    create?: XOR<ImplementationPlanCreateWithoutTaskInput, ImplementationPlanUncheckedCreateWithoutTaskInput> | ImplementationPlanCreateWithoutTaskInput[] | ImplementationPlanUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ImplementationPlanCreateOrConnectWithoutTaskInput | ImplementationPlanCreateOrConnectWithoutTaskInput[]
    createMany?: ImplementationPlanCreateManyTaskInputEnvelope
    connect?: ImplementationPlanWhereUniqueInput | ImplementationPlanWhereUniqueInput[]
  }

  export type SubtaskCreateNestedManyWithoutTaskInput = {
    create?: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput> | SubtaskCreateWithoutTaskInput[] | SubtaskUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutTaskInput | SubtaskCreateOrConnectWithoutTaskInput[]
    createMany?: SubtaskCreateManyTaskInputEnvelope
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
  }

  export type DelegationRecordCreateNestedManyWithoutTaskInput = {
    create?: XOR<DelegationRecordCreateWithoutTaskInput, DelegationRecordUncheckedCreateWithoutTaskInput> | DelegationRecordCreateWithoutTaskInput[] | DelegationRecordUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: DelegationRecordCreateOrConnectWithoutTaskInput | DelegationRecordCreateOrConnectWithoutTaskInput[]
    createMany?: DelegationRecordCreateManyTaskInputEnvelope
    connect?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
  }

  export type ResearchReportCreateNestedManyWithoutTaskInput = {
    create?: XOR<ResearchReportCreateWithoutTaskInput, ResearchReportUncheckedCreateWithoutTaskInput> | ResearchReportCreateWithoutTaskInput[] | ResearchReportUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ResearchReportCreateOrConnectWithoutTaskInput | ResearchReportCreateOrConnectWithoutTaskInput[]
    createMany?: ResearchReportCreateManyTaskInputEnvelope
    connect?: ResearchReportWhereUniqueInput | ResearchReportWhereUniqueInput[]
  }

  export type CodeReviewCreateNestedManyWithoutTaskInput = {
    create?: XOR<CodeReviewCreateWithoutTaskInput, CodeReviewUncheckedCreateWithoutTaskInput> | CodeReviewCreateWithoutTaskInput[] | CodeReviewUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CodeReviewCreateOrConnectWithoutTaskInput | CodeReviewCreateOrConnectWithoutTaskInput[]
    createMany?: CodeReviewCreateManyTaskInputEnvelope
    connect?: CodeReviewWhereUniqueInput | CodeReviewWhereUniqueInput[]
  }

  export type CompletionReportCreateNestedManyWithoutTaskInput = {
    create?: XOR<CompletionReportCreateWithoutTaskInput, CompletionReportUncheckedCreateWithoutTaskInput> | CompletionReportCreateWithoutTaskInput[] | CompletionReportUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CompletionReportCreateOrConnectWithoutTaskInput | CompletionReportCreateOrConnectWithoutTaskInput[]
    createMany?: CompletionReportCreateManyTaskInputEnvelope
    connect?: CompletionReportWhereUniqueInput | CompletionReportWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutTaskInput = {
    create?: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput> | CommentCreateWithoutTaskInput[] | CommentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutTaskInput | CommentCreateOrConnectWithoutTaskInput[]
    createMany?: CommentCreateManyTaskInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type WorkflowTransitionCreateNestedManyWithoutTaskInput = {
    create?: XOR<WorkflowTransitionCreateWithoutTaskInput, WorkflowTransitionUncheckedCreateWithoutTaskInput> | WorkflowTransitionCreateWithoutTaskInput[] | WorkflowTransitionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: WorkflowTransitionCreateOrConnectWithoutTaskInput | WorkflowTransitionCreateOrConnectWithoutTaskInput[]
    createMany?: WorkflowTransitionCreateManyTaskInputEnvelope
    connect?: WorkflowTransitionWhereUniqueInput | WorkflowTransitionWhereUniqueInput[]
  }

  export type CodebaseAnalysisCreateNestedOneWithoutTaskInput = {
    create?: XOR<CodebaseAnalysisCreateWithoutTaskInput, CodebaseAnalysisUncheckedCreateWithoutTaskInput>
    connectOrCreate?: CodebaseAnalysisCreateOrConnectWithoutTaskInput
    connect?: CodebaseAnalysisWhereUniqueInput
  }

  export type TaskDescriptionUncheckedCreateNestedOneWithoutTaskInput = {
    create?: XOR<TaskDescriptionCreateWithoutTaskInput, TaskDescriptionUncheckedCreateWithoutTaskInput>
    connectOrCreate?: TaskDescriptionCreateOrConnectWithoutTaskInput
    connect?: TaskDescriptionWhereUniqueInput
  }

  export type ImplementationPlanUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<ImplementationPlanCreateWithoutTaskInput, ImplementationPlanUncheckedCreateWithoutTaskInput> | ImplementationPlanCreateWithoutTaskInput[] | ImplementationPlanUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ImplementationPlanCreateOrConnectWithoutTaskInput | ImplementationPlanCreateOrConnectWithoutTaskInput[]
    createMany?: ImplementationPlanCreateManyTaskInputEnvelope
    connect?: ImplementationPlanWhereUniqueInput | ImplementationPlanWhereUniqueInput[]
  }

  export type SubtaskUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput> | SubtaskCreateWithoutTaskInput[] | SubtaskUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutTaskInput | SubtaskCreateOrConnectWithoutTaskInput[]
    createMany?: SubtaskCreateManyTaskInputEnvelope
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
  }

  export type DelegationRecordUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<DelegationRecordCreateWithoutTaskInput, DelegationRecordUncheckedCreateWithoutTaskInput> | DelegationRecordCreateWithoutTaskInput[] | DelegationRecordUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: DelegationRecordCreateOrConnectWithoutTaskInput | DelegationRecordCreateOrConnectWithoutTaskInput[]
    createMany?: DelegationRecordCreateManyTaskInputEnvelope
    connect?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
  }

  export type ResearchReportUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<ResearchReportCreateWithoutTaskInput, ResearchReportUncheckedCreateWithoutTaskInput> | ResearchReportCreateWithoutTaskInput[] | ResearchReportUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ResearchReportCreateOrConnectWithoutTaskInput | ResearchReportCreateOrConnectWithoutTaskInput[]
    createMany?: ResearchReportCreateManyTaskInputEnvelope
    connect?: ResearchReportWhereUniqueInput | ResearchReportWhereUniqueInput[]
  }

  export type CodeReviewUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<CodeReviewCreateWithoutTaskInput, CodeReviewUncheckedCreateWithoutTaskInput> | CodeReviewCreateWithoutTaskInput[] | CodeReviewUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CodeReviewCreateOrConnectWithoutTaskInput | CodeReviewCreateOrConnectWithoutTaskInput[]
    createMany?: CodeReviewCreateManyTaskInputEnvelope
    connect?: CodeReviewWhereUniqueInput | CodeReviewWhereUniqueInput[]
  }

  export type CompletionReportUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<CompletionReportCreateWithoutTaskInput, CompletionReportUncheckedCreateWithoutTaskInput> | CompletionReportCreateWithoutTaskInput[] | CompletionReportUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CompletionReportCreateOrConnectWithoutTaskInput | CompletionReportCreateOrConnectWithoutTaskInput[]
    createMany?: CompletionReportCreateManyTaskInputEnvelope
    connect?: CompletionReportWhereUniqueInput | CompletionReportWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput> | CommentCreateWithoutTaskInput[] | CommentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutTaskInput | CommentCreateOrConnectWithoutTaskInput[]
    createMany?: CommentCreateManyTaskInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type WorkflowTransitionUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<WorkflowTransitionCreateWithoutTaskInput, WorkflowTransitionUncheckedCreateWithoutTaskInput> | WorkflowTransitionCreateWithoutTaskInput[] | WorkflowTransitionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: WorkflowTransitionCreateOrConnectWithoutTaskInput | WorkflowTransitionCreateOrConnectWithoutTaskInput[]
    createMany?: WorkflowTransitionCreateManyTaskInputEnvelope
    connect?: WorkflowTransitionWhereUniqueInput | WorkflowTransitionWhereUniqueInput[]
  }

  export type CodebaseAnalysisUncheckedCreateNestedOneWithoutTaskInput = {
    create?: XOR<CodebaseAnalysisCreateWithoutTaskInput, CodebaseAnalysisUncheckedCreateWithoutTaskInput>
    connectOrCreate?: CodebaseAnalysisCreateOrConnectWithoutTaskInput
    connect?: CodebaseAnalysisWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TaskDescriptionUpdateOneWithoutTaskNestedInput = {
    create?: XOR<TaskDescriptionCreateWithoutTaskInput, TaskDescriptionUncheckedCreateWithoutTaskInput>
    connectOrCreate?: TaskDescriptionCreateOrConnectWithoutTaskInput
    upsert?: TaskDescriptionUpsertWithoutTaskInput
    disconnect?: TaskDescriptionWhereInput | boolean
    delete?: TaskDescriptionWhereInput | boolean
    connect?: TaskDescriptionWhereUniqueInput
    update?: XOR<XOR<TaskDescriptionUpdateToOneWithWhereWithoutTaskInput, TaskDescriptionUpdateWithoutTaskInput>, TaskDescriptionUncheckedUpdateWithoutTaskInput>
  }

  export type ImplementationPlanUpdateManyWithoutTaskNestedInput = {
    create?: XOR<ImplementationPlanCreateWithoutTaskInput, ImplementationPlanUncheckedCreateWithoutTaskInput> | ImplementationPlanCreateWithoutTaskInput[] | ImplementationPlanUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ImplementationPlanCreateOrConnectWithoutTaskInput | ImplementationPlanCreateOrConnectWithoutTaskInput[]
    upsert?: ImplementationPlanUpsertWithWhereUniqueWithoutTaskInput | ImplementationPlanUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: ImplementationPlanCreateManyTaskInputEnvelope
    set?: ImplementationPlanWhereUniqueInput | ImplementationPlanWhereUniqueInput[]
    disconnect?: ImplementationPlanWhereUniqueInput | ImplementationPlanWhereUniqueInput[]
    delete?: ImplementationPlanWhereUniqueInput | ImplementationPlanWhereUniqueInput[]
    connect?: ImplementationPlanWhereUniqueInput | ImplementationPlanWhereUniqueInput[]
    update?: ImplementationPlanUpdateWithWhereUniqueWithoutTaskInput | ImplementationPlanUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: ImplementationPlanUpdateManyWithWhereWithoutTaskInput | ImplementationPlanUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: ImplementationPlanScalarWhereInput | ImplementationPlanScalarWhereInput[]
  }

  export type SubtaskUpdateManyWithoutTaskNestedInput = {
    create?: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput> | SubtaskCreateWithoutTaskInput[] | SubtaskUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutTaskInput | SubtaskCreateOrConnectWithoutTaskInput[]
    upsert?: SubtaskUpsertWithWhereUniqueWithoutTaskInput | SubtaskUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: SubtaskCreateManyTaskInputEnvelope
    set?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    disconnect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    delete?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    update?: SubtaskUpdateWithWhereUniqueWithoutTaskInput | SubtaskUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: SubtaskUpdateManyWithWhereWithoutTaskInput | SubtaskUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[]
  }

  export type DelegationRecordUpdateManyWithoutTaskNestedInput = {
    create?: XOR<DelegationRecordCreateWithoutTaskInput, DelegationRecordUncheckedCreateWithoutTaskInput> | DelegationRecordCreateWithoutTaskInput[] | DelegationRecordUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: DelegationRecordCreateOrConnectWithoutTaskInput | DelegationRecordCreateOrConnectWithoutTaskInput[]
    upsert?: DelegationRecordUpsertWithWhereUniqueWithoutTaskInput | DelegationRecordUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: DelegationRecordCreateManyTaskInputEnvelope
    set?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
    disconnect?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
    delete?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
    connect?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
    update?: DelegationRecordUpdateWithWhereUniqueWithoutTaskInput | DelegationRecordUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: DelegationRecordUpdateManyWithWhereWithoutTaskInput | DelegationRecordUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: DelegationRecordScalarWhereInput | DelegationRecordScalarWhereInput[]
  }

  export type ResearchReportUpdateManyWithoutTaskNestedInput = {
    create?: XOR<ResearchReportCreateWithoutTaskInput, ResearchReportUncheckedCreateWithoutTaskInput> | ResearchReportCreateWithoutTaskInput[] | ResearchReportUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ResearchReportCreateOrConnectWithoutTaskInput | ResearchReportCreateOrConnectWithoutTaskInput[]
    upsert?: ResearchReportUpsertWithWhereUniqueWithoutTaskInput | ResearchReportUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: ResearchReportCreateManyTaskInputEnvelope
    set?: ResearchReportWhereUniqueInput | ResearchReportWhereUniqueInput[]
    disconnect?: ResearchReportWhereUniqueInput | ResearchReportWhereUniqueInput[]
    delete?: ResearchReportWhereUniqueInput | ResearchReportWhereUniqueInput[]
    connect?: ResearchReportWhereUniqueInput | ResearchReportWhereUniqueInput[]
    update?: ResearchReportUpdateWithWhereUniqueWithoutTaskInput | ResearchReportUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: ResearchReportUpdateManyWithWhereWithoutTaskInput | ResearchReportUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: ResearchReportScalarWhereInput | ResearchReportScalarWhereInput[]
  }

  export type CodeReviewUpdateManyWithoutTaskNestedInput = {
    create?: XOR<CodeReviewCreateWithoutTaskInput, CodeReviewUncheckedCreateWithoutTaskInput> | CodeReviewCreateWithoutTaskInput[] | CodeReviewUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CodeReviewCreateOrConnectWithoutTaskInput | CodeReviewCreateOrConnectWithoutTaskInput[]
    upsert?: CodeReviewUpsertWithWhereUniqueWithoutTaskInput | CodeReviewUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: CodeReviewCreateManyTaskInputEnvelope
    set?: CodeReviewWhereUniqueInput | CodeReviewWhereUniqueInput[]
    disconnect?: CodeReviewWhereUniqueInput | CodeReviewWhereUniqueInput[]
    delete?: CodeReviewWhereUniqueInput | CodeReviewWhereUniqueInput[]
    connect?: CodeReviewWhereUniqueInput | CodeReviewWhereUniqueInput[]
    update?: CodeReviewUpdateWithWhereUniqueWithoutTaskInput | CodeReviewUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: CodeReviewUpdateManyWithWhereWithoutTaskInput | CodeReviewUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: CodeReviewScalarWhereInput | CodeReviewScalarWhereInput[]
  }

  export type CompletionReportUpdateManyWithoutTaskNestedInput = {
    create?: XOR<CompletionReportCreateWithoutTaskInput, CompletionReportUncheckedCreateWithoutTaskInput> | CompletionReportCreateWithoutTaskInput[] | CompletionReportUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CompletionReportCreateOrConnectWithoutTaskInput | CompletionReportCreateOrConnectWithoutTaskInput[]
    upsert?: CompletionReportUpsertWithWhereUniqueWithoutTaskInput | CompletionReportUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: CompletionReportCreateManyTaskInputEnvelope
    set?: CompletionReportWhereUniqueInput | CompletionReportWhereUniqueInput[]
    disconnect?: CompletionReportWhereUniqueInput | CompletionReportWhereUniqueInput[]
    delete?: CompletionReportWhereUniqueInput | CompletionReportWhereUniqueInput[]
    connect?: CompletionReportWhereUniqueInput | CompletionReportWhereUniqueInput[]
    update?: CompletionReportUpdateWithWhereUniqueWithoutTaskInput | CompletionReportUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: CompletionReportUpdateManyWithWhereWithoutTaskInput | CompletionReportUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: CompletionReportScalarWhereInput | CompletionReportScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutTaskNestedInput = {
    create?: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput> | CommentCreateWithoutTaskInput[] | CommentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutTaskInput | CommentCreateOrConnectWithoutTaskInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutTaskInput | CommentUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: CommentCreateManyTaskInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutTaskInput | CommentUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutTaskInput | CommentUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type WorkflowTransitionUpdateManyWithoutTaskNestedInput = {
    create?: XOR<WorkflowTransitionCreateWithoutTaskInput, WorkflowTransitionUncheckedCreateWithoutTaskInput> | WorkflowTransitionCreateWithoutTaskInput[] | WorkflowTransitionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: WorkflowTransitionCreateOrConnectWithoutTaskInput | WorkflowTransitionCreateOrConnectWithoutTaskInput[]
    upsert?: WorkflowTransitionUpsertWithWhereUniqueWithoutTaskInput | WorkflowTransitionUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: WorkflowTransitionCreateManyTaskInputEnvelope
    set?: WorkflowTransitionWhereUniqueInput | WorkflowTransitionWhereUniqueInput[]
    disconnect?: WorkflowTransitionWhereUniqueInput | WorkflowTransitionWhereUniqueInput[]
    delete?: WorkflowTransitionWhereUniqueInput | WorkflowTransitionWhereUniqueInput[]
    connect?: WorkflowTransitionWhereUniqueInput | WorkflowTransitionWhereUniqueInput[]
    update?: WorkflowTransitionUpdateWithWhereUniqueWithoutTaskInput | WorkflowTransitionUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: WorkflowTransitionUpdateManyWithWhereWithoutTaskInput | WorkflowTransitionUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: WorkflowTransitionScalarWhereInput | WorkflowTransitionScalarWhereInput[]
  }

  export type CodebaseAnalysisUpdateOneWithoutTaskNestedInput = {
    create?: XOR<CodebaseAnalysisCreateWithoutTaskInput, CodebaseAnalysisUncheckedCreateWithoutTaskInput>
    connectOrCreate?: CodebaseAnalysisCreateOrConnectWithoutTaskInput
    upsert?: CodebaseAnalysisUpsertWithoutTaskInput
    disconnect?: CodebaseAnalysisWhereInput | boolean
    delete?: CodebaseAnalysisWhereInput | boolean
    connect?: CodebaseAnalysisWhereUniqueInput
    update?: XOR<XOR<CodebaseAnalysisUpdateToOneWithWhereWithoutTaskInput, CodebaseAnalysisUpdateWithoutTaskInput>, CodebaseAnalysisUncheckedUpdateWithoutTaskInput>
  }

  export type TaskDescriptionUncheckedUpdateOneWithoutTaskNestedInput = {
    create?: XOR<TaskDescriptionCreateWithoutTaskInput, TaskDescriptionUncheckedCreateWithoutTaskInput>
    connectOrCreate?: TaskDescriptionCreateOrConnectWithoutTaskInput
    upsert?: TaskDescriptionUpsertWithoutTaskInput
    disconnect?: TaskDescriptionWhereInput | boolean
    delete?: TaskDescriptionWhereInput | boolean
    connect?: TaskDescriptionWhereUniqueInput
    update?: XOR<XOR<TaskDescriptionUpdateToOneWithWhereWithoutTaskInput, TaskDescriptionUpdateWithoutTaskInput>, TaskDescriptionUncheckedUpdateWithoutTaskInput>
  }

  export type ImplementationPlanUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<ImplementationPlanCreateWithoutTaskInput, ImplementationPlanUncheckedCreateWithoutTaskInput> | ImplementationPlanCreateWithoutTaskInput[] | ImplementationPlanUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ImplementationPlanCreateOrConnectWithoutTaskInput | ImplementationPlanCreateOrConnectWithoutTaskInput[]
    upsert?: ImplementationPlanUpsertWithWhereUniqueWithoutTaskInput | ImplementationPlanUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: ImplementationPlanCreateManyTaskInputEnvelope
    set?: ImplementationPlanWhereUniqueInput | ImplementationPlanWhereUniqueInput[]
    disconnect?: ImplementationPlanWhereUniqueInput | ImplementationPlanWhereUniqueInput[]
    delete?: ImplementationPlanWhereUniqueInput | ImplementationPlanWhereUniqueInput[]
    connect?: ImplementationPlanWhereUniqueInput | ImplementationPlanWhereUniqueInput[]
    update?: ImplementationPlanUpdateWithWhereUniqueWithoutTaskInput | ImplementationPlanUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: ImplementationPlanUpdateManyWithWhereWithoutTaskInput | ImplementationPlanUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: ImplementationPlanScalarWhereInput | ImplementationPlanScalarWhereInput[]
  }

  export type SubtaskUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput> | SubtaskCreateWithoutTaskInput[] | SubtaskUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutTaskInput | SubtaskCreateOrConnectWithoutTaskInput[]
    upsert?: SubtaskUpsertWithWhereUniqueWithoutTaskInput | SubtaskUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: SubtaskCreateManyTaskInputEnvelope
    set?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    disconnect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    delete?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    update?: SubtaskUpdateWithWhereUniqueWithoutTaskInput | SubtaskUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: SubtaskUpdateManyWithWhereWithoutTaskInput | SubtaskUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[]
  }

  export type DelegationRecordUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<DelegationRecordCreateWithoutTaskInput, DelegationRecordUncheckedCreateWithoutTaskInput> | DelegationRecordCreateWithoutTaskInput[] | DelegationRecordUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: DelegationRecordCreateOrConnectWithoutTaskInput | DelegationRecordCreateOrConnectWithoutTaskInput[]
    upsert?: DelegationRecordUpsertWithWhereUniqueWithoutTaskInput | DelegationRecordUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: DelegationRecordCreateManyTaskInputEnvelope
    set?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
    disconnect?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
    delete?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
    connect?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
    update?: DelegationRecordUpdateWithWhereUniqueWithoutTaskInput | DelegationRecordUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: DelegationRecordUpdateManyWithWhereWithoutTaskInput | DelegationRecordUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: DelegationRecordScalarWhereInput | DelegationRecordScalarWhereInput[]
  }

  export type ResearchReportUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<ResearchReportCreateWithoutTaskInput, ResearchReportUncheckedCreateWithoutTaskInput> | ResearchReportCreateWithoutTaskInput[] | ResearchReportUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ResearchReportCreateOrConnectWithoutTaskInput | ResearchReportCreateOrConnectWithoutTaskInput[]
    upsert?: ResearchReportUpsertWithWhereUniqueWithoutTaskInput | ResearchReportUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: ResearchReportCreateManyTaskInputEnvelope
    set?: ResearchReportWhereUniqueInput | ResearchReportWhereUniqueInput[]
    disconnect?: ResearchReportWhereUniqueInput | ResearchReportWhereUniqueInput[]
    delete?: ResearchReportWhereUniqueInput | ResearchReportWhereUniqueInput[]
    connect?: ResearchReportWhereUniqueInput | ResearchReportWhereUniqueInput[]
    update?: ResearchReportUpdateWithWhereUniqueWithoutTaskInput | ResearchReportUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: ResearchReportUpdateManyWithWhereWithoutTaskInput | ResearchReportUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: ResearchReportScalarWhereInput | ResearchReportScalarWhereInput[]
  }

  export type CodeReviewUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<CodeReviewCreateWithoutTaskInput, CodeReviewUncheckedCreateWithoutTaskInput> | CodeReviewCreateWithoutTaskInput[] | CodeReviewUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CodeReviewCreateOrConnectWithoutTaskInput | CodeReviewCreateOrConnectWithoutTaskInput[]
    upsert?: CodeReviewUpsertWithWhereUniqueWithoutTaskInput | CodeReviewUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: CodeReviewCreateManyTaskInputEnvelope
    set?: CodeReviewWhereUniqueInput | CodeReviewWhereUniqueInput[]
    disconnect?: CodeReviewWhereUniqueInput | CodeReviewWhereUniqueInput[]
    delete?: CodeReviewWhereUniqueInput | CodeReviewWhereUniqueInput[]
    connect?: CodeReviewWhereUniqueInput | CodeReviewWhereUniqueInput[]
    update?: CodeReviewUpdateWithWhereUniqueWithoutTaskInput | CodeReviewUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: CodeReviewUpdateManyWithWhereWithoutTaskInput | CodeReviewUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: CodeReviewScalarWhereInput | CodeReviewScalarWhereInput[]
  }

  export type CompletionReportUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<CompletionReportCreateWithoutTaskInput, CompletionReportUncheckedCreateWithoutTaskInput> | CompletionReportCreateWithoutTaskInput[] | CompletionReportUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CompletionReportCreateOrConnectWithoutTaskInput | CompletionReportCreateOrConnectWithoutTaskInput[]
    upsert?: CompletionReportUpsertWithWhereUniqueWithoutTaskInput | CompletionReportUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: CompletionReportCreateManyTaskInputEnvelope
    set?: CompletionReportWhereUniqueInput | CompletionReportWhereUniqueInput[]
    disconnect?: CompletionReportWhereUniqueInput | CompletionReportWhereUniqueInput[]
    delete?: CompletionReportWhereUniqueInput | CompletionReportWhereUniqueInput[]
    connect?: CompletionReportWhereUniqueInput | CompletionReportWhereUniqueInput[]
    update?: CompletionReportUpdateWithWhereUniqueWithoutTaskInput | CompletionReportUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: CompletionReportUpdateManyWithWhereWithoutTaskInput | CompletionReportUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: CompletionReportScalarWhereInput | CompletionReportScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput> | CommentCreateWithoutTaskInput[] | CommentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutTaskInput | CommentCreateOrConnectWithoutTaskInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutTaskInput | CommentUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: CommentCreateManyTaskInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutTaskInput | CommentUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutTaskInput | CommentUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type WorkflowTransitionUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<WorkflowTransitionCreateWithoutTaskInput, WorkflowTransitionUncheckedCreateWithoutTaskInput> | WorkflowTransitionCreateWithoutTaskInput[] | WorkflowTransitionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: WorkflowTransitionCreateOrConnectWithoutTaskInput | WorkflowTransitionCreateOrConnectWithoutTaskInput[]
    upsert?: WorkflowTransitionUpsertWithWhereUniqueWithoutTaskInput | WorkflowTransitionUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: WorkflowTransitionCreateManyTaskInputEnvelope
    set?: WorkflowTransitionWhereUniqueInput | WorkflowTransitionWhereUniqueInput[]
    disconnect?: WorkflowTransitionWhereUniqueInput | WorkflowTransitionWhereUniqueInput[]
    delete?: WorkflowTransitionWhereUniqueInput | WorkflowTransitionWhereUniqueInput[]
    connect?: WorkflowTransitionWhereUniqueInput | WorkflowTransitionWhereUniqueInput[]
    update?: WorkflowTransitionUpdateWithWhereUniqueWithoutTaskInput | WorkflowTransitionUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: WorkflowTransitionUpdateManyWithWhereWithoutTaskInput | WorkflowTransitionUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: WorkflowTransitionScalarWhereInput | WorkflowTransitionScalarWhereInput[]
  }

  export type CodebaseAnalysisUncheckedUpdateOneWithoutTaskNestedInput = {
    create?: XOR<CodebaseAnalysisCreateWithoutTaskInput, CodebaseAnalysisUncheckedCreateWithoutTaskInput>
    connectOrCreate?: CodebaseAnalysisCreateOrConnectWithoutTaskInput
    upsert?: CodebaseAnalysisUpsertWithoutTaskInput
    disconnect?: CodebaseAnalysisWhereInput | boolean
    delete?: CodebaseAnalysisWhereInput | boolean
    connect?: CodebaseAnalysisWhereUniqueInput
    update?: XOR<XOR<CodebaseAnalysisUpdateToOneWithWhereWithoutTaskInput, CodebaseAnalysisUpdateWithoutTaskInput>, CodebaseAnalysisUncheckedUpdateWithoutTaskInput>
  }

  export type TaskCreateNestedOneWithoutTaskDescriptionInput = {
    create?: XOR<TaskCreateWithoutTaskDescriptionInput, TaskUncheckedCreateWithoutTaskDescriptionInput>
    connectOrCreate?: TaskCreateOrConnectWithoutTaskDescriptionInput
    connect?: TaskWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutTaskDescriptionNestedInput = {
    create?: XOR<TaskCreateWithoutTaskDescriptionInput, TaskUncheckedCreateWithoutTaskDescriptionInput>
    connectOrCreate?: TaskCreateOrConnectWithoutTaskDescriptionInput
    upsert?: TaskUpsertWithoutTaskDescriptionInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutTaskDescriptionInput, TaskUpdateWithoutTaskDescriptionInput>, TaskUncheckedUpdateWithoutTaskDescriptionInput>
  }

  export type TaskCreateNestedOneWithoutImplementationPlansInput = {
    create?: XOR<TaskCreateWithoutImplementationPlansInput, TaskUncheckedCreateWithoutImplementationPlansInput>
    connectOrCreate?: TaskCreateOrConnectWithoutImplementationPlansInput
    connect?: TaskWhereUniqueInput
  }

  export type SubtaskCreateNestedManyWithoutPlanInput = {
    create?: XOR<SubtaskCreateWithoutPlanInput, SubtaskUncheckedCreateWithoutPlanInput> | SubtaskCreateWithoutPlanInput[] | SubtaskUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutPlanInput | SubtaskCreateOrConnectWithoutPlanInput[]
    createMany?: SubtaskCreateManyPlanInputEnvelope
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
  }

  export type SubtaskUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<SubtaskCreateWithoutPlanInput, SubtaskUncheckedCreateWithoutPlanInput> | SubtaskCreateWithoutPlanInput[] | SubtaskUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutPlanInput | SubtaskCreateOrConnectWithoutPlanInput[]
    createMany?: SubtaskCreateManyPlanInputEnvelope
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
  }

  export type TaskUpdateOneRequiredWithoutImplementationPlansNestedInput = {
    create?: XOR<TaskCreateWithoutImplementationPlansInput, TaskUncheckedCreateWithoutImplementationPlansInput>
    connectOrCreate?: TaskCreateOrConnectWithoutImplementationPlansInput
    upsert?: TaskUpsertWithoutImplementationPlansInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutImplementationPlansInput, TaskUpdateWithoutImplementationPlansInput>, TaskUncheckedUpdateWithoutImplementationPlansInput>
  }

  export type SubtaskUpdateManyWithoutPlanNestedInput = {
    create?: XOR<SubtaskCreateWithoutPlanInput, SubtaskUncheckedCreateWithoutPlanInput> | SubtaskCreateWithoutPlanInput[] | SubtaskUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutPlanInput | SubtaskCreateOrConnectWithoutPlanInput[]
    upsert?: SubtaskUpsertWithWhereUniqueWithoutPlanInput | SubtaskUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: SubtaskCreateManyPlanInputEnvelope
    set?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    disconnect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    delete?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    update?: SubtaskUpdateWithWhereUniqueWithoutPlanInput | SubtaskUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: SubtaskUpdateManyWithWhereWithoutPlanInput | SubtaskUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[]
  }

  export type SubtaskUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<SubtaskCreateWithoutPlanInput, SubtaskUncheckedCreateWithoutPlanInput> | SubtaskCreateWithoutPlanInput[] | SubtaskUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutPlanInput | SubtaskCreateOrConnectWithoutPlanInput[]
    upsert?: SubtaskUpsertWithWhereUniqueWithoutPlanInput | SubtaskUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: SubtaskCreateManyPlanInputEnvelope
    set?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    disconnect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    delete?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    update?: SubtaskUpdateWithWhereUniqueWithoutPlanInput | SubtaskUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: SubtaskUpdateManyWithWhereWithoutPlanInput | SubtaskUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutSubtasksInput = {
    create?: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>
    connectOrCreate?: TaskCreateOrConnectWithoutSubtasksInput
    connect?: TaskWhereUniqueInput
  }

  export type ImplementationPlanCreateNestedOneWithoutSubtasksInput = {
    create?: XOR<ImplementationPlanCreateWithoutSubtasksInput, ImplementationPlanUncheckedCreateWithoutSubtasksInput>
    connectOrCreate?: ImplementationPlanCreateOrConnectWithoutSubtasksInput
    connect?: ImplementationPlanWhereUniqueInput
  }

  export type DelegationRecordCreateNestedManyWithoutSubtaskInput = {
    create?: XOR<DelegationRecordCreateWithoutSubtaskInput, DelegationRecordUncheckedCreateWithoutSubtaskInput> | DelegationRecordCreateWithoutSubtaskInput[] | DelegationRecordUncheckedCreateWithoutSubtaskInput[]
    connectOrCreate?: DelegationRecordCreateOrConnectWithoutSubtaskInput | DelegationRecordCreateOrConnectWithoutSubtaskInput[]
    createMany?: DelegationRecordCreateManySubtaskInputEnvelope
    connect?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutSubtaskInput = {
    create?: XOR<CommentCreateWithoutSubtaskInput, CommentUncheckedCreateWithoutSubtaskInput> | CommentCreateWithoutSubtaskInput[] | CommentUncheckedCreateWithoutSubtaskInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutSubtaskInput | CommentCreateOrConnectWithoutSubtaskInput[]
    createMany?: CommentCreateManySubtaskInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type DelegationRecordUncheckedCreateNestedManyWithoutSubtaskInput = {
    create?: XOR<DelegationRecordCreateWithoutSubtaskInput, DelegationRecordUncheckedCreateWithoutSubtaskInput> | DelegationRecordCreateWithoutSubtaskInput[] | DelegationRecordUncheckedCreateWithoutSubtaskInput[]
    connectOrCreate?: DelegationRecordCreateOrConnectWithoutSubtaskInput | DelegationRecordCreateOrConnectWithoutSubtaskInput[]
    createMany?: DelegationRecordCreateManySubtaskInputEnvelope
    connect?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutSubtaskInput = {
    create?: XOR<CommentCreateWithoutSubtaskInput, CommentUncheckedCreateWithoutSubtaskInput> | CommentCreateWithoutSubtaskInput[] | CommentUncheckedCreateWithoutSubtaskInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutSubtaskInput | CommentCreateOrConnectWithoutSubtaskInput[]
    createMany?: CommentCreateManySubtaskInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type TaskUpdateOneRequiredWithoutSubtasksNestedInput = {
    create?: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>
    connectOrCreate?: TaskCreateOrConnectWithoutSubtasksInput
    upsert?: TaskUpsertWithoutSubtasksInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutSubtasksInput, TaskUpdateWithoutSubtasksInput>, TaskUncheckedUpdateWithoutSubtasksInput>
  }

  export type ImplementationPlanUpdateOneRequiredWithoutSubtasksNestedInput = {
    create?: XOR<ImplementationPlanCreateWithoutSubtasksInput, ImplementationPlanUncheckedCreateWithoutSubtasksInput>
    connectOrCreate?: ImplementationPlanCreateOrConnectWithoutSubtasksInput
    upsert?: ImplementationPlanUpsertWithoutSubtasksInput
    connect?: ImplementationPlanWhereUniqueInput
    update?: XOR<XOR<ImplementationPlanUpdateToOneWithWhereWithoutSubtasksInput, ImplementationPlanUpdateWithoutSubtasksInput>, ImplementationPlanUncheckedUpdateWithoutSubtasksInput>
  }

  export type DelegationRecordUpdateManyWithoutSubtaskNestedInput = {
    create?: XOR<DelegationRecordCreateWithoutSubtaskInput, DelegationRecordUncheckedCreateWithoutSubtaskInput> | DelegationRecordCreateWithoutSubtaskInput[] | DelegationRecordUncheckedCreateWithoutSubtaskInput[]
    connectOrCreate?: DelegationRecordCreateOrConnectWithoutSubtaskInput | DelegationRecordCreateOrConnectWithoutSubtaskInput[]
    upsert?: DelegationRecordUpsertWithWhereUniqueWithoutSubtaskInput | DelegationRecordUpsertWithWhereUniqueWithoutSubtaskInput[]
    createMany?: DelegationRecordCreateManySubtaskInputEnvelope
    set?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
    disconnect?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
    delete?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
    connect?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
    update?: DelegationRecordUpdateWithWhereUniqueWithoutSubtaskInput | DelegationRecordUpdateWithWhereUniqueWithoutSubtaskInput[]
    updateMany?: DelegationRecordUpdateManyWithWhereWithoutSubtaskInput | DelegationRecordUpdateManyWithWhereWithoutSubtaskInput[]
    deleteMany?: DelegationRecordScalarWhereInput | DelegationRecordScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutSubtaskNestedInput = {
    create?: XOR<CommentCreateWithoutSubtaskInput, CommentUncheckedCreateWithoutSubtaskInput> | CommentCreateWithoutSubtaskInput[] | CommentUncheckedCreateWithoutSubtaskInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutSubtaskInput | CommentCreateOrConnectWithoutSubtaskInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutSubtaskInput | CommentUpsertWithWhereUniqueWithoutSubtaskInput[]
    createMany?: CommentCreateManySubtaskInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutSubtaskInput | CommentUpdateWithWhereUniqueWithoutSubtaskInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutSubtaskInput | CommentUpdateManyWithWhereWithoutSubtaskInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type DelegationRecordUncheckedUpdateManyWithoutSubtaskNestedInput = {
    create?: XOR<DelegationRecordCreateWithoutSubtaskInput, DelegationRecordUncheckedCreateWithoutSubtaskInput> | DelegationRecordCreateWithoutSubtaskInput[] | DelegationRecordUncheckedCreateWithoutSubtaskInput[]
    connectOrCreate?: DelegationRecordCreateOrConnectWithoutSubtaskInput | DelegationRecordCreateOrConnectWithoutSubtaskInput[]
    upsert?: DelegationRecordUpsertWithWhereUniqueWithoutSubtaskInput | DelegationRecordUpsertWithWhereUniqueWithoutSubtaskInput[]
    createMany?: DelegationRecordCreateManySubtaskInputEnvelope
    set?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
    disconnect?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
    delete?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
    connect?: DelegationRecordWhereUniqueInput | DelegationRecordWhereUniqueInput[]
    update?: DelegationRecordUpdateWithWhereUniqueWithoutSubtaskInput | DelegationRecordUpdateWithWhereUniqueWithoutSubtaskInput[]
    updateMany?: DelegationRecordUpdateManyWithWhereWithoutSubtaskInput | DelegationRecordUpdateManyWithWhereWithoutSubtaskInput[]
    deleteMany?: DelegationRecordScalarWhereInput | DelegationRecordScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutSubtaskNestedInput = {
    create?: XOR<CommentCreateWithoutSubtaskInput, CommentUncheckedCreateWithoutSubtaskInput> | CommentCreateWithoutSubtaskInput[] | CommentUncheckedCreateWithoutSubtaskInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutSubtaskInput | CommentCreateOrConnectWithoutSubtaskInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutSubtaskInput | CommentUpsertWithWhereUniqueWithoutSubtaskInput[]
    createMany?: CommentCreateManySubtaskInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutSubtaskInput | CommentUpdateWithWhereUniqueWithoutSubtaskInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutSubtaskInput | CommentUpdateManyWithWhereWithoutSubtaskInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutDelegationRecordsInput = {
    create?: XOR<TaskCreateWithoutDelegationRecordsInput, TaskUncheckedCreateWithoutDelegationRecordsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutDelegationRecordsInput
    connect?: TaskWhereUniqueInput
  }

  export type SubtaskCreateNestedOneWithoutDelegationRecordsInput = {
    create?: XOR<SubtaskCreateWithoutDelegationRecordsInput, SubtaskUncheckedCreateWithoutDelegationRecordsInput>
    connectOrCreate?: SubtaskCreateOrConnectWithoutDelegationRecordsInput
    connect?: SubtaskWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type TaskUpdateOneRequiredWithoutDelegationRecordsNestedInput = {
    create?: XOR<TaskCreateWithoutDelegationRecordsInput, TaskUncheckedCreateWithoutDelegationRecordsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutDelegationRecordsInput
    upsert?: TaskUpsertWithoutDelegationRecordsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutDelegationRecordsInput, TaskUpdateWithoutDelegationRecordsInput>, TaskUncheckedUpdateWithoutDelegationRecordsInput>
  }

  export type SubtaskUpdateOneWithoutDelegationRecordsNestedInput = {
    create?: XOR<SubtaskCreateWithoutDelegationRecordsInput, SubtaskUncheckedCreateWithoutDelegationRecordsInput>
    connectOrCreate?: SubtaskCreateOrConnectWithoutDelegationRecordsInput
    upsert?: SubtaskUpsertWithoutDelegationRecordsInput
    disconnect?: SubtaskWhereInput | boolean
    delete?: SubtaskWhereInput | boolean
    connect?: SubtaskWhereUniqueInput
    update?: XOR<XOR<SubtaskUpdateToOneWithWhereWithoutDelegationRecordsInput, SubtaskUpdateWithoutDelegationRecordsInput>, SubtaskUncheckedUpdateWithoutDelegationRecordsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TaskCreateNestedOneWithoutResearchReportsInput = {
    create?: XOR<TaskCreateWithoutResearchReportsInput, TaskUncheckedCreateWithoutResearchReportsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutResearchReportsInput
    connect?: TaskWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutResearchReportsNestedInput = {
    create?: XOR<TaskCreateWithoutResearchReportsInput, TaskUncheckedCreateWithoutResearchReportsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutResearchReportsInput
    upsert?: TaskUpsertWithoutResearchReportsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutResearchReportsInput, TaskUpdateWithoutResearchReportsInput>, TaskUncheckedUpdateWithoutResearchReportsInput>
  }

  export type TaskCreateNestedOneWithoutCodeReviewsInput = {
    create?: XOR<TaskCreateWithoutCodeReviewsInput, TaskUncheckedCreateWithoutCodeReviewsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCodeReviewsInput
    connect?: TaskWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutCodeReviewsNestedInput = {
    create?: XOR<TaskCreateWithoutCodeReviewsInput, TaskUncheckedCreateWithoutCodeReviewsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCodeReviewsInput
    upsert?: TaskUpsertWithoutCodeReviewsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutCodeReviewsInput, TaskUpdateWithoutCodeReviewsInput>, TaskUncheckedUpdateWithoutCodeReviewsInput>
  }

  export type TaskCreateNestedOneWithoutCompletionReportsInput = {
    create?: XOR<TaskCreateWithoutCompletionReportsInput, TaskUncheckedCreateWithoutCompletionReportsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCompletionReportsInput
    connect?: TaskWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutCompletionReportsNestedInput = {
    create?: XOR<TaskCreateWithoutCompletionReportsInput, TaskUncheckedCreateWithoutCompletionReportsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCompletionReportsInput
    upsert?: TaskUpsertWithoutCompletionReportsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutCompletionReportsInput, TaskUpdateWithoutCompletionReportsInput>, TaskUncheckedUpdateWithoutCompletionReportsInput>
  }

  export type TaskCreateNestedOneWithoutCommentsInput = {
    create?: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCommentsInput
    connect?: TaskWhereUniqueInput
  }

  export type SubtaskCreateNestedOneWithoutCommentsInput = {
    create?: XOR<SubtaskCreateWithoutCommentsInput, SubtaskUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: SubtaskCreateOrConnectWithoutCommentsInput
    connect?: SubtaskWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCommentsInput
    upsert?: TaskUpsertWithoutCommentsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutCommentsInput, TaskUpdateWithoutCommentsInput>, TaskUncheckedUpdateWithoutCommentsInput>
  }

  export type SubtaskUpdateOneWithoutCommentsNestedInput = {
    create?: XOR<SubtaskCreateWithoutCommentsInput, SubtaskUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: SubtaskCreateOrConnectWithoutCommentsInput
    upsert?: SubtaskUpsertWithoutCommentsInput
    disconnect?: SubtaskWhereInput | boolean
    delete?: SubtaskWhereInput | boolean
    connect?: SubtaskWhereUniqueInput
    update?: XOR<XOR<SubtaskUpdateToOneWithWhereWithoutCommentsInput, SubtaskUpdateWithoutCommentsInput>, SubtaskUncheckedUpdateWithoutCommentsInput>
  }

  export type TaskCreateNestedOneWithoutWorkflowTransitionsInput = {
    create?: XOR<TaskCreateWithoutWorkflowTransitionsInput, TaskUncheckedCreateWithoutWorkflowTransitionsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutWorkflowTransitionsInput
    connect?: TaskWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutWorkflowTransitionsNestedInput = {
    create?: XOR<TaskCreateWithoutWorkflowTransitionsInput, TaskUncheckedCreateWithoutWorkflowTransitionsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutWorkflowTransitionsInput
    upsert?: TaskUpsertWithoutWorkflowTransitionsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutWorkflowTransitionsInput, TaskUpdateWithoutWorkflowTransitionsInput>, TaskUncheckedUpdateWithoutWorkflowTransitionsInput>
  }

  export type TaskCreateNestedOneWithoutCodebaseAnalysisInput = {
    create?: XOR<TaskCreateWithoutCodebaseAnalysisInput, TaskUncheckedCreateWithoutCodebaseAnalysisInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCodebaseAnalysisInput
    connect?: TaskWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutCodebaseAnalysisNestedInput = {
    create?: XOR<TaskCreateWithoutCodebaseAnalysisInput, TaskUncheckedCreateWithoutCodebaseAnalysisInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCodebaseAnalysisInput
    upsert?: TaskUpsertWithoutCodebaseAnalysisInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutCodebaseAnalysisInput, TaskUpdateWithoutCodebaseAnalysisInput>, TaskUncheckedUpdateWithoutCodebaseAnalysisInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type TaskDescriptionCreateWithoutTaskInput = {
    description: string
    businessRequirements: string
    technicalRequirements: string
    acceptanceCriteria: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskDescriptionUncheckedCreateWithoutTaskInput = {
    description: string
    businessRequirements: string
    technicalRequirements: string
    acceptanceCriteria: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskDescriptionCreateOrConnectWithoutTaskInput = {
    where: TaskDescriptionWhereUniqueInput
    create: XOR<TaskDescriptionCreateWithoutTaskInput, TaskDescriptionUncheckedCreateWithoutTaskInput>
  }

  export type ImplementationPlanCreateWithoutTaskInput = {
    overview: string
    approach: string
    technicalDecisions: string
    filesToModify: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    subtasks?: SubtaskCreateNestedManyWithoutPlanInput
  }

  export type ImplementationPlanUncheckedCreateWithoutTaskInput = {
    id?: number
    overview: string
    approach: string
    technicalDecisions: string
    filesToModify: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutPlanInput
  }

  export type ImplementationPlanCreateOrConnectWithoutTaskInput = {
    where: ImplementationPlanWhereUniqueInput
    create: XOR<ImplementationPlanCreateWithoutTaskInput, ImplementationPlanUncheckedCreateWithoutTaskInput>
  }

  export type ImplementationPlanCreateManyTaskInputEnvelope = {
    data: ImplementationPlanCreateManyTaskInput | ImplementationPlanCreateManyTaskInput[]
  }

  export type SubtaskCreateWithoutTaskInput = {
    name: string
    description: string
    sequenceNumber: number
    status: string
    assignedTo?: string | null
    estimatedDuration?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    batchId?: string | null
    batchTitle?: string | null
    plan: ImplementationPlanCreateNestedOneWithoutSubtasksInput
    delegationRecords?: DelegationRecordCreateNestedManyWithoutSubtaskInput
    comments?: CommentCreateNestedManyWithoutSubtaskInput
  }

  export type SubtaskUncheckedCreateWithoutTaskInput = {
    id?: number
    planId: number
    name: string
    description: string
    sequenceNumber: number
    status: string
    assignedTo?: string | null
    estimatedDuration?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    batchId?: string | null
    batchTitle?: string | null
    delegationRecords?: DelegationRecordUncheckedCreateNestedManyWithoutSubtaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutSubtaskInput
  }

  export type SubtaskCreateOrConnectWithoutTaskInput = {
    where: SubtaskWhereUniqueInput
    create: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput>
  }

  export type SubtaskCreateManyTaskInputEnvelope = {
    data: SubtaskCreateManyTaskInput | SubtaskCreateManyTaskInput[]
  }

  export type DelegationRecordCreateWithoutTaskInput = {
    fromMode: string
    toMode: string
    delegationTimestamp?: Date | string
    completionTimestamp?: Date | string | null
    success?: boolean | null
    rejectionReason?: string | null
    redelegationCount?: number
    subtask?: SubtaskCreateNestedOneWithoutDelegationRecordsInput
  }

  export type DelegationRecordUncheckedCreateWithoutTaskInput = {
    id?: number
    subtaskId?: number | null
    fromMode: string
    toMode: string
    delegationTimestamp?: Date | string
    completionTimestamp?: Date | string | null
    success?: boolean | null
    rejectionReason?: string | null
    redelegationCount?: number
  }

  export type DelegationRecordCreateOrConnectWithoutTaskInput = {
    where: DelegationRecordWhereUniqueInput
    create: XOR<DelegationRecordCreateWithoutTaskInput, DelegationRecordUncheckedCreateWithoutTaskInput>
  }

  export type DelegationRecordCreateManyTaskInputEnvelope = {
    data: DelegationRecordCreateManyTaskInput | DelegationRecordCreateManyTaskInput[]
  }

  export type ResearchReportCreateWithoutTaskInput = {
    title: string
    summary: string
    findings: string
    recommendations: string
    references: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResearchReportUncheckedCreateWithoutTaskInput = {
    id?: number
    title: string
    summary: string
    findings: string
    recommendations: string
    references: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResearchReportCreateOrConnectWithoutTaskInput = {
    where: ResearchReportWhereUniqueInput
    create: XOR<ResearchReportCreateWithoutTaskInput, ResearchReportUncheckedCreateWithoutTaskInput>
  }

  export type ResearchReportCreateManyTaskInputEnvelope = {
    data: ResearchReportCreateManyTaskInput | ResearchReportCreateManyTaskInput[]
  }

  export type CodeReviewCreateWithoutTaskInput = {
    status: string
    summary: string
    strengths: string
    issues: string
    acceptanceCriteriaVerification: JsonNullValueInput | InputJsonValue
    manualTestingResults: string
    requiredChanges?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CodeReviewUncheckedCreateWithoutTaskInput = {
    id?: number
    status: string
    summary: string
    strengths: string
    issues: string
    acceptanceCriteriaVerification: JsonNullValueInput | InputJsonValue
    manualTestingResults: string
    requiredChanges?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CodeReviewCreateOrConnectWithoutTaskInput = {
    where: CodeReviewWhereUniqueInput
    create: XOR<CodeReviewCreateWithoutTaskInput, CodeReviewUncheckedCreateWithoutTaskInput>
  }

  export type CodeReviewCreateManyTaskInputEnvelope = {
    data: CodeReviewCreateManyTaskInput | CodeReviewCreateManyTaskInput[]
  }

  export type CompletionReportCreateWithoutTaskInput = {
    summary: string
    filesModified: JsonNullValueInput | InputJsonValue
    delegationSummary: string
    acceptanceCriteriaVerification: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CompletionReportUncheckedCreateWithoutTaskInput = {
    id?: number
    summary: string
    filesModified: JsonNullValueInput | InputJsonValue
    delegationSummary: string
    acceptanceCriteriaVerification: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CompletionReportCreateOrConnectWithoutTaskInput = {
    where: CompletionReportWhereUniqueInput
    create: XOR<CompletionReportCreateWithoutTaskInput, CompletionReportUncheckedCreateWithoutTaskInput>
  }

  export type CompletionReportCreateManyTaskInputEnvelope = {
    data: CompletionReportCreateManyTaskInput | CompletionReportCreateManyTaskInput[]
  }

  export type CommentCreateWithoutTaskInput = {
    mode: string
    content: string
    createdAt?: Date | string
    subtask?: SubtaskCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutTaskInput = {
    id?: number
    subtaskId?: number | null
    mode: string
    content: string
    createdAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutTaskInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput>
  }

  export type CommentCreateManyTaskInputEnvelope = {
    data: CommentCreateManyTaskInput | CommentCreateManyTaskInput[]
  }

  export type WorkflowTransitionCreateWithoutTaskInput = {
    fromMode: string
    toMode: string
    transitionTimestamp?: Date | string
    reason?: string | null
  }

  export type WorkflowTransitionUncheckedCreateWithoutTaskInput = {
    id?: number
    fromMode: string
    toMode: string
    transitionTimestamp?: Date | string
    reason?: string | null
  }

  export type WorkflowTransitionCreateOrConnectWithoutTaskInput = {
    where: WorkflowTransitionWhereUniqueInput
    create: XOR<WorkflowTransitionCreateWithoutTaskInput, WorkflowTransitionUncheckedCreateWithoutTaskInput>
  }

  export type WorkflowTransitionCreateManyTaskInputEnvelope = {
    data: WorkflowTransitionCreateManyTaskInput | WorkflowTransitionCreateManyTaskInput[]
  }

  export type CodebaseAnalysisCreateWithoutTaskInput = {
    architectureFindings: JsonNullValueInput | InputJsonValue
    problemsIdentified: JsonNullValueInput | InputJsonValue
    implementationContext: JsonNullValueInput | InputJsonValue
    integrationPoints: JsonNullValueInput | InputJsonValue
    qualityAssessment: JsonNullValueInput | InputJsonValue
    filesCovered: JsonNullValueInput | InputJsonValue
    technologyStack: JsonNullValueInput | InputJsonValue
    analyzedAt?: Date | string
    updatedAt?: Date | string
    analyzedBy: string
    analysisVersion?: string
  }

  export type CodebaseAnalysisUncheckedCreateWithoutTaskInput = {
    id?: number
    architectureFindings: JsonNullValueInput | InputJsonValue
    problemsIdentified: JsonNullValueInput | InputJsonValue
    implementationContext: JsonNullValueInput | InputJsonValue
    integrationPoints: JsonNullValueInput | InputJsonValue
    qualityAssessment: JsonNullValueInput | InputJsonValue
    filesCovered: JsonNullValueInput | InputJsonValue
    technologyStack: JsonNullValueInput | InputJsonValue
    analyzedAt?: Date | string
    updatedAt?: Date | string
    analyzedBy: string
    analysisVersion?: string
  }

  export type CodebaseAnalysisCreateOrConnectWithoutTaskInput = {
    where: CodebaseAnalysisWhereUniqueInput
    create: XOR<CodebaseAnalysisCreateWithoutTaskInput, CodebaseAnalysisUncheckedCreateWithoutTaskInput>
  }

  export type TaskDescriptionUpsertWithoutTaskInput = {
    update: XOR<TaskDescriptionUpdateWithoutTaskInput, TaskDescriptionUncheckedUpdateWithoutTaskInput>
    create: XOR<TaskDescriptionCreateWithoutTaskInput, TaskDescriptionUncheckedCreateWithoutTaskInput>
    where?: TaskDescriptionWhereInput
  }

  export type TaskDescriptionUpdateToOneWithWhereWithoutTaskInput = {
    where?: TaskDescriptionWhereInput
    data: XOR<TaskDescriptionUpdateWithoutTaskInput, TaskDescriptionUncheckedUpdateWithoutTaskInput>
  }

  export type TaskDescriptionUpdateWithoutTaskInput = {
    description?: StringFieldUpdateOperationsInput | string
    businessRequirements?: StringFieldUpdateOperationsInput | string
    technicalRequirements?: StringFieldUpdateOperationsInput | string
    acceptanceCriteria?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskDescriptionUncheckedUpdateWithoutTaskInput = {
    description?: StringFieldUpdateOperationsInput | string
    businessRequirements?: StringFieldUpdateOperationsInput | string
    technicalRequirements?: StringFieldUpdateOperationsInput | string
    acceptanceCriteria?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImplementationPlanUpsertWithWhereUniqueWithoutTaskInput = {
    where: ImplementationPlanWhereUniqueInput
    update: XOR<ImplementationPlanUpdateWithoutTaskInput, ImplementationPlanUncheckedUpdateWithoutTaskInput>
    create: XOR<ImplementationPlanCreateWithoutTaskInput, ImplementationPlanUncheckedCreateWithoutTaskInput>
  }

  export type ImplementationPlanUpdateWithWhereUniqueWithoutTaskInput = {
    where: ImplementationPlanWhereUniqueInput
    data: XOR<ImplementationPlanUpdateWithoutTaskInput, ImplementationPlanUncheckedUpdateWithoutTaskInput>
  }

  export type ImplementationPlanUpdateManyWithWhereWithoutTaskInput = {
    where: ImplementationPlanScalarWhereInput
    data: XOR<ImplementationPlanUpdateManyMutationInput, ImplementationPlanUncheckedUpdateManyWithoutTaskInput>
  }

  export type ImplementationPlanScalarWhereInput = {
    AND?: ImplementationPlanScalarWhereInput | ImplementationPlanScalarWhereInput[]
    OR?: ImplementationPlanScalarWhereInput[]
    NOT?: ImplementationPlanScalarWhereInput | ImplementationPlanScalarWhereInput[]
    id?: IntFilter<"ImplementationPlan"> | number
    taskId?: StringFilter<"ImplementationPlan"> | string
    overview?: StringFilter<"ImplementationPlan"> | string
    approach?: StringFilter<"ImplementationPlan"> | string
    technicalDecisions?: StringFilter<"ImplementationPlan"> | string
    filesToModify?: JsonFilter<"ImplementationPlan">
    createdAt?: DateTimeFilter<"ImplementationPlan"> | Date | string
    updatedAt?: DateTimeFilter<"ImplementationPlan"> | Date | string
    createdBy?: StringFilter<"ImplementationPlan"> | string
  }

  export type SubtaskUpsertWithWhereUniqueWithoutTaskInput = {
    where: SubtaskWhereUniqueInput
    update: XOR<SubtaskUpdateWithoutTaskInput, SubtaskUncheckedUpdateWithoutTaskInput>
    create: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput>
  }

  export type SubtaskUpdateWithWhereUniqueWithoutTaskInput = {
    where: SubtaskWhereUniqueInput
    data: XOR<SubtaskUpdateWithoutTaskInput, SubtaskUncheckedUpdateWithoutTaskInput>
  }

  export type SubtaskUpdateManyWithWhereWithoutTaskInput = {
    where: SubtaskScalarWhereInput
    data: XOR<SubtaskUpdateManyMutationInput, SubtaskUncheckedUpdateManyWithoutTaskInput>
  }

  export type SubtaskScalarWhereInput = {
    AND?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[]
    OR?: SubtaskScalarWhereInput[]
    NOT?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[]
    id?: IntFilter<"Subtask"> | number
    taskId?: StringFilter<"Subtask"> | string
    planId?: IntFilter<"Subtask"> | number
    name?: StringFilter<"Subtask"> | string
    description?: StringFilter<"Subtask"> | string
    sequenceNumber?: IntFilter<"Subtask"> | number
    status?: StringFilter<"Subtask"> | string
    assignedTo?: StringNullableFilter<"Subtask"> | string | null
    estimatedDuration?: StringNullableFilter<"Subtask"> | string | null
    startedAt?: DateTimeNullableFilter<"Subtask"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Subtask"> | Date | string | null
    batchId?: StringNullableFilter<"Subtask"> | string | null
    batchTitle?: StringNullableFilter<"Subtask"> | string | null
  }

  export type DelegationRecordUpsertWithWhereUniqueWithoutTaskInput = {
    where: DelegationRecordWhereUniqueInput
    update: XOR<DelegationRecordUpdateWithoutTaskInput, DelegationRecordUncheckedUpdateWithoutTaskInput>
    create: XOR<DelegationRecordCreateWithoutTaskInput, DelegationRecordUncheckedCreateWithoutTaskInput>
  }

  export type DelegationRecordUpdateWithWhereUniqueWithoutTaskInput = {
    where: DelegationRecordWhereUniqueInput
    data: XOR<DelegationRecordUpdateWithoutTaskInput, DelegationRecordUncheckedUpdateWithoutTaskInput>
  }

  export type DelegationRecordUpdateManyWithWhereWithoutTaskInput = {
    where: DelegationRecordScalarWhereInput
    data: XOR<DelegationRecordUpdateManyMutationInput, DelegationRecordUncheckedUpdateManyWithoutTaskInput>
  }

  export type DelegationRecordScalarWhereInput = {
    AND?: DelegationRecordScalarWhereInput | DelegationRecordScalarWhereInput[]
    OR?: DelegationRecordScalarWhereInput[]
    NOT?: DelegationRecordScalarWhereInput | DelegationRecordScalarWhereInput[]
    id?: IntFilter<"DelegationRecord"> | number
    taskId?: StringFilter<"DelegationRecord"> | string
    subtaskId?: IntNullableFilter<"DelegationRecord"> | number | null
    fromMode?: StringFilter<"DelegationRecord"> | string
    toMode?: StringFilter<"DelegationRecord"> | string
    delegationTimestamp?: DateTimeFilter<"DelegationRecord"> | Date | string
    completionTimestamp?: DateTimeNullableFilter<"DelegationRecord"> | Date | string | null
    success?: BoolNullableFilter<"DelegationRecord"> | boolean | null
    rejectionReason?: StringNullableFilter<"DelegationRecord"> | string | null
    redelegationCount?: IntFilter<"DelegationRecord"> | number
  }

  export type ResearchReportUpsertWithWhereUniqueWithoutTaskInput = {
    where: ResearchReportWhereUniqueInput
    update: XOR<ResearchReportUpdateWithoutTaskInput, ResearchReportUncheckedUpdateWithoutTaskInput>
    create: XOR<ResearchReportCreateWithoutTaskInput, ResearchReportUncheckedCreateWithoutTaskInput>
  }

  export type ResearchReportUpdateWithWhereUniqueWithoutTaskInput = {
    where: ResearchReportWhereUniqueInput
    data: XOR<ResearchReportUpdateWithoutTaskInput, ResearchReportUncheckedUpdateWithoutTaskInput>
  }

  export type ResearchReportUpdateManyWithWhereWithoutTaskInput = {
    where: ResearchReportScalarWhereInput
    data: XOR<ResearchReportUpdateManyMutationInput, ResearchReportUncheckedUpdateManyWithoutTaskInput>
  }

  export type ResearchReportScalarWhereInput = {
    AND?: ResearchReportScalarWhereInput | ResearchReportScalarWhereInput[]
    OR?: ResearchReportScalarWhereInput[]
    NOT?: ResearchReportScalarWhereInput | ResearchReportScalarWhereInput[]
    id?: IntFilter<"ResearchReport"> | number
    taskId?: StringFilter<"ResearchReport"> | string
    title?: StringFilter<"ResearchReport"> | string
    summary?: StringFilter<"ResearchReport"> | string
    findings?: StringFilter<"ResearchReport"> | string
    recommendations?: StringFilter<"ResearchReport"> | string
    references?: JsonFilter<"ResearchReport">
    createdAt?: DateTimeFilter<"ResearchReport"> | Date | string
    updatedAt?: DateTimeFilter<"ResearchReport"> | Date | string
  }

  export type CodeReviewUpsertWithWhereUniqueWithoutTaskInput = {
    where: CodeReviewWhereUniqueInput
    update: XOR<CodeReviewUpdateWithoutTaskInput, CodeReviewUncheckedUpdateWithoutTaskInput>
    create: XOR<CodeReviewCreateWithoutTaskInput, CodeReviewUncheckedCreateWithoutTaskInput>
  }

  export type CodeReviewUpdateWithWhereUniqueWithoutTaskInput = {
    where: CodeReviewWhereUniqueInput
    data: XOR<CodeReviewUpdateWithoutTaskInput, CodeReviewUncheckedUpdateWithoutTaskInput>
  }

  export type CodeReviewUpdateManyWithWhereWithoutTaskInput = {
    where: CodeReviewScalarWhereInput
    data: XOR<CodeReviewUpdateManyMutationInput, CodeReviewUncheckedUpdateManyWithoutTaskInput>
  }

  export type CodeReviewScalarWhereInput = {
    AND?: CodeReviewScalarWhereInput | CodeReviewScalarWhereInput[]
    OR?: CodeReviewScalarWhereInput[]
    NOT?: CodeReviewScalarWhereInput | CodeReviewScalarWhereInput[]
    id?: IntFilter<"CodeReview"> | number
    taskId?: StringFilter<"CodeReview"> | string
    status?: StringFilter<"CodeReview"> | string
    summary?: StringFilter<"CodeReview"> | string
    strengths?: StringFilter<"CodeReview"> | string
    issues?: StringFilter<"CodeReview"> | string
    acceptanceCriteriaVerification?: JsonFilter<"CodeReview">
    manualTestingResults?: StringFilter<"CodeReview"> | string
    requiredChanges?: StringNullableFilter<"CodeReview"> | string | null
    createdAt?: DateTimeFilter<"CodeReview"> | Date | string
    updatedAt?: DateTimeFilter<"CodeReview"> | Date | string
  }

  export type CompletionReportUpsertWithWhereUniqueWithoutTaskInput = {
    where: CompletionReportWhereUniqueInput
    update: XOR<CompletionReportUpdateWithoutTaskInput, CompletionReportUncheckedUpdateWithoutTaskInput>
    create: XOR<CompletionReportCreateWithoutTaskInput, CompletionReportUncheckedCreateWithoutTaskInput>
  }

  export type CompletionReportUpdateWithWhereUniqueWithoutTaskInput = {
    where: CompletionReportWhereUniqueInput
    data: XOR<CompletionReportUpdateWithoutTaskInput, CompletionReportUncheckedUpdateWithoutTaskInput>
  }

  export type CompletionReportUpdateManyWithWhereWithoutTaskInput = {
    where: CompletionReportScalarWhereInput
    data: XOR<CompletionReportUpdateManyMutationInput, CompletionReportUncheckedUpdateManyWithoutTaskInput>
  }

  export type CompletionReportScalarWhereInput = {
    AND?: CompletionReportScalarWhereInput | CompletionReportScalarWhereInput[]
    OR?: CompletionReportScalarWhereInput[]
    NOT?: CompletionReportScalarWhereInput | CompletionReportScalarWhereInput[]
    id?: IntFilter<"CompletionReport"> | number
    taskId?: StringFilter<"CompletionReport"> | string
    summary?: StringFilter<"CompletionReport"> | string
    filesModified?: JsonFilter<"CompletionReport">
    delegationSummary?: StringFilter<"CompletionReport"> | string
    acceptanceCriteriaVerification?: JsonFilter<"CompletionReport">
    createdAt?: DateTimeFilter<"CompletionReport"> | Date | string
  }

  export type CommentUpsertWithWhereUniqueWithoutTaskInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutTaskInput, CommentUncheckedUpdateWithoutTaskInput>
    create: XOR<CommentCreateWithoutTaskInput, CommentUncheckedCreateWithoutTaskInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutTaskInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutTaskInput, CommentUncheckedUpdateWithoutTaskInput>
  }

  export type CommentUpdateManyWithWhereWithoutTaskInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutTaskInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: IntFilter<"Comment"> | number
    taskId?: StringFilter<"Comment"> | string
    subtaskId?: IntNullableFilter<"Comment"> | number | null
    mode?: StringFilter<"Comment"> | string
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
  }

  export type WorkflowTransitionUpsertWithWhereUniqueWithoutTaskInput = {
    where: WorkflowTransitionWhereUniqueInput
    update: XOR<WorkflowTransitionUpdateWithoutTaskInput, WorkflowTransitionUncheckedUpdateWithoutTaskInput>
    create: XOR<WorkflowTransitionCreateWithoutTaskInput, WorkflowTransitionUncheckedCreateWithoutTaskInput>
  }

  export type WorkflowTransitionUpdateWithWhereUniqueWithoutTaskInput = {
    where: WorkflowTransitionWhereUniqueInput
    data: XOR<WorkflowTransitionUpdateWithoutTaskInput, WorkflowTransitionUncheckedUpdateWithoutTaskInput>
  }

  export type WorkflowTransitionUpdateManyWithWhereWithoutTaskInput = {
    where: WorkflowTransitionScalarWhereInput
    data: XOR<WorkflowTransitionUpdateManyMutationInput, WorkflowTransitionUncheckedUpdateManyWithoutTaskInput>
  }

  export type WorkflowTransitionScalarWhereInput = {
    AND?: WorkflowTransitionScalarWhereInput | WorkflowTransitionScalarWhereInput[]
    OR?: WorkflowTransitionScalarWhereInput[]
    NOT?: WorkflowTransitionScalarWhereInput | WorkflowTransitionScalarWhereInput[]
    id?: IntFilter<"WorkflowTransition"> | number
    taskId?: StringFilter<"WorkflowTransition"> | string
    fromMode?: StringFilter<"WorkflowTransition"> | string
    toMode?: StringFilter<"WorkflowTransition"> | string
    transitionTimestamp?: DateTimeFilter<"WorkflowTransition"> | Date | string
    reason?: StringNullableFilter<"WorkflowTransition"> | string | null
  }

  export type CodebaseAnalysisUpsertWithoutTaskInput = {
    update: XOR<CodebaseAnalysisUpdateWithoutTaskInput, CodebaseAnalysisUncheckedUpdateWithoutTaskInput>
    create: XOR<CodebaseAnalysisCreateWithoutTaskInput, CodebaseAnalysisUncheckedCreateWithoutTaskInput>
    where?: CodebaseAnalysisWhereInput
  }

  export type CodebaseAnalysisUpdateToOneWithWhereWithoutTaskInput = {
    where?: CodebaseAnalysisWhereInput
    data: XOR<CodebaseAnalysisUpdateWithoutTaskInput, CodebaseAnalysisUncheckedUpdateWithoutTaskInput>
  }

  export type CodebaseAnalysisUpdateWithoutTaskInput = {
    architectureFindings?: JsonNullValueInput | InputJsonValue
    problemsIdentified?: JsonNullValueInput | InputJsonValue
    implementationContext?: JsonNullValueInput | InputJsonValue
    integrationPoints?: JsonNullValueInput | InputJsonValue
    qualityAssessment?: JsonNullValueInput | InputJsonValue
    filesCovered?: JsonNullValueInput | InputJsonValue
    technologyStack?: JsonNullValueInput | InputJsonValue
    analyzedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    analyzedBy?: StringFieldUpdateOperationsInput | string
    analysisVersion?: StringFieldUpdateOperationsInput | string
  }

  export type CodebaseAnalysisUncheckedUpdateWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    architectureFindings?: JsonNullValueInput | InputJsonValue
    problemsIdentified?: JsonNullValueInput | InputJsonValue
    implementationContext?: JsonNullValueInput | InputJsonValue
    integrationPoints?: JsonNullValueInput | InputJsonValue
    qualityAssessment?: JsonNullValueInput | InputJsonValue
    filesCovered?: JsonNullValueInput | InputJsonValue
    technologyStack?: JsonNullValueInput | InputJsonValue
    analyzedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    analyzedBy?: StringFieldUpdateOperationsInput | string
    analysisVersion?: StringFieldUpdateOperationsInput | string
  }

  export type TaskCreateWithoutTaskDescriptionInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    implementationPlans?: ImplementationPlanCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportCreateNestedManyWithoutTaskInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisCreateNestedOneWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutTaskDescriptionInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    implementationPlans?: ImplementationPlanUncheckedCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordUncheckedCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportUncheckedCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewUncheckedCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionUncheckedCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedCreateNestedOneWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutTaskDescriptionInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutTaskDescriptionInput, TaskUncheckedCreateWithoutTaskDescriptionInput>
  }

  export type TaskUpsertWithoutTaskDescriptionInput = {
    update: XOR<TaskUpdateWithoutTaskDescriptionInput, TaskUncheckedUpdateWithoutTaskDescriptionInput>
    create: XOR<TaskCreateWithoutTaskDescriptionInput, TaskUncheckedCreateWithoutTaskDescriptionInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutTaskDescriptionInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutTaskDescriptionInput, TaskUncheckedUpdateWithoutTaskDescriptionInput>
  }

  export type TaskUpdateWithoutTaskDescriptionInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    implementationPlans?: ImplementationPlanUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUpdateManyWithoutTaskNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUpdateOneWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutTaskDescriptionInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    implementationPlans?: ImplementationPlanUncheckedUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUncheckedUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUncheckedUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUncheckedUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUncheckedUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedUpdateOneWithoutTaskNestedInput
  }

  export type TaskCreateWithoutImplementationPlansInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionCreateNestedOneWithoutTaskInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportCreateNestedManyWithoutTaskInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisCreateNestedOneWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutImplementationPlansInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionUncheckedCreateNestedOneWithoutTaskInput
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordUncheckedCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportUncheckedCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewUncheckedCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionUncheckedCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedCreateNestedOneWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutImplementationPlansInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutImplementationPlansInput, TaskUncheckedCreateWithoutImplementationPlansInput>
  }

  export type SubtaskCreateWithoutPlanInput = {
    name: string
    description: string
    sequenceNumber: number
    status: string
    assignedTo?: string | null
    estimatedDuration?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    batchId?: string | null
    batchTitle?: string | null
    task: TaskCreateNestedOneWithoutSubtasksInput
    delegationRecords?: DelegationRecordCreateNestedManyWithoutSubtaskInput
    comments?: CommentCreateNestedManyWithoutSubtaskInput
  }

  export type SubtaskUncheckedCreateWithoutPlanInput = {
    id?: number
    taskId: string
    name: string
    description: string
    sequenceNumber: number
    status: string
    assignedTo?: string | null
    estimatedDuration?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    batchId?: string | null
    batchTitle?: string | null
    delegationRecords?: DelegationRecordUncheckedCreateNestedManyWithoutSubtaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutSubtaskInput
  }

  export type SubtaskCreateOrConnectWithoutPlanInput = {
    where: SubtaskWhereUniqueInput
    create: XOR<SubtaskCreateWithoutPlanInput, SubtaskUncheckedCreateWithoutPlanInput>
  }

  export type SubtaskCreateManyPlanInputEnvelope = {
    data: SubtaskCreateManyPlanInput | SubtaskCreateManyPlanInput[]
  }

  export type TaskUpsertWithoutImplementationPlansInput = {
    update: XOR<TaskUpdateWithoutImplementationPlansInput, TaskUncheckedUpdateWithoutImplementationPlansInput>
    create: XOR<TaskCreateWithoutImplementationPlansInput, TaskUncheckedCreateWithoutImplementationPlansInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutImplementationPlansInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutImplementationPlansInput, TaskUncheckedUpdateWithoutImplementationPlansInput>
  }

  export type TaskUpdateWithoutImplementationPlansInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUpdateOneWithoutTaskNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUpdateManyWithoutTaskNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUpdateOneWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutImplementationPlansInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUncheckedUpdateOneWithoutTaskNestedInput
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUncheckedUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUncheckedUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUncheckedUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUncheckedUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedUpdateOneWithoutTaskNestedInput
  }

  export type SubtaskUpsertWithWhereUniqueWithoutPlanInput = {
    where: SubtaskWhereUniqueInput
    update: XOR<SubtaskUpdateWithoutPlanInput, SubtaskUncheckedUpdateWithoutPlanInput>
    create: XOR<SubtaskCreateWithoutPlanInput, SubtaskUncheckedCreateWithoutPlanInput>
  }

  export type SubtaskUpdateWithWhereUniqueWithoutPlanInput = {
    where: SubtaskWhereUniqueInput
    data: XOR<SubtaskUpdateWithoutPlanInput, SubtaskUncheckedUpdateWithoutPlanInput>
  }

  export type SubtaskUpdateManyWithWhereWithoutPlanInput = {
    where: SubtaskScalarWhereInput
    data: XOR<SubtaskUpdateManyMutationInput, SubtaskUncheckedUpdateManyWithoutPlanInput>
  }

  export type TaskCreateWithoutSubtasksInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportCreateNestedManyWithoutTaskInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisCreateNestedOneWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutSubtasksInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionUncheckedCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanUncheckedCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordUncheckedCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportUncheckedCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewUncheckedCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionUncheckedCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedCreateNestedOneWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutSubtasksInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>
  }

  export type ImplementationPlanCreateWithoutSubtasksInput = {
    overview: string
    approach: string
    technicalDecisions: string
    filesToModify: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    task: TaskCreateNestedOneWithoutImplementationPlansInput
  }

  export type ImplementationPlanUncheckedCreateWithoutSubtasksInput = {
    id?: number
    taskId: string
    overview: string
    approach: string
    technicalDecisions: string
    filesToModify: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
  }

  export type ImplementationPlanCreateOrConnectWithoutSubtasksInput = {
    where: ImplementationPlanWhereUniqueInput
    create: XOR<ImplementationPlanCreateWithoutSubtasksInput, ImplementationPlanUncheckedCreateWithoutSubtasksInput>
  }

  export type DelegationRecordCreateWithoutSubtaskInput = {
    fromMode: string
    toMode: string
    delegationTimestamp?: Date | string
    completionTimestamp?: Date | string | null
    success?: boolean | null
    rejectionReason?: string | null
    redelegationCount?: number
    task: TaskCreateNestedOneWithoutDelegationRecordsInput
  }

  export type DelegationRecordUncheckedCreateWithoutSubtaskInput = {
    id?: number
    taskId: string
    fromMode: string
    toMode: string
    delegationTimestamp?: Date | string
    completionTimestamp?: Date | string | null
    success?: boolean | null
    rejectionReason?: string | null
    redelegationCount?: number
  }

  export type DelegationRecordCreateOrConnectWithoutSubtaskInput = {
    where: DelegationRecordWhereUniqueInput
    create: XOR<DelegationRecordCreateWithoutSubtaskInput, DelegationRecordUncheckedCreateWithoutSubtaskInput>
  }

  export type DelegationRecordCreateManySubtaskInputEnvelope = {
    data: DelegationRecordCreateManySubtaskInput | DelegationRecordCreateManySubtaskInput[]
  }

  export type CommentCreateWithoutSubtaskInput = {
    mode: string
    content: string
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutSubtaskInput = {
    id?: number
    taskId: string
    mode: string
    content: string
    createdAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutSubtaskInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutSubtaskInput, CommentUncheckedCreateWithoutSubtaskInput>
  }

  export type CommentCreateManySubtaskInputEnvelope = {
    data: CommentCreateManySubtaskInput | CommentCreateManySubtaskInput[]
  }

  export type TaskUpsertWithoutSubtasksInput = {
    update: XOR<TaskUpdateWithoutSubtasksInput, TaskUncheckedUpdateWithoutSubtasksInput>
    create: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutSubtasksInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutSubtasksInput, TaskUncheckedUpdateWithoutSubtasksInput>
  }

  export type TaskUpdateWithoutSubtasksInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUpdateManyWithoutTaskNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUpdateOneWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutSubtasksInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUncheckedUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUncheckedUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUncheckedUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUncheckedUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUncheckedUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUncheckedUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedUpdateOneWithoutTaskNestedInput
  }

  export type ImplementationPlanUpsertWithoutSubtasksInput = {
    update: XOR<ImplementationPlanUpdateWithoutSubtasksInput, ImplementationPlanUncheckedUpdateWithoutSubtasksInput>
    create: XOR<ImplementationPlanCreateWithoutSubtasksInput, ImplementationPlanUncheckedCreateWithoutSubtasksInput>
    where?: ImplementationPlanWhereInput
  }

  export type ImplementationPlanUpdateToOneWithWhereWithoutSubtasksInput = {
    where?: ImplementationPlanWhereInput
    data: XOR<ImplementationPlanUpdateWithoutSubtasksInput, ImplementationPlanUncheckedUpdateWithoutSubtasksInput>
  }

  export type ImplementationPlanUpdateWithoutSubtasksInput = {
    overview?: StringFieldUpdateOperationsInput | string
    approach?: StringFieldUpdateOperationsInput | string
    technicalDecisions?: StringFieldUpdateOperationsInput | string
    filesToModify?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    task?: TaskUpdateOneRequiredWithoutImplementationPlansNestedInput
  }

  export type ImplementationPlanUncheckedUpdateWithoutSubtasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    approach?: StringFieldUpdateOperationsInput | string
    technicalDecisions?: StringFieldUpdateOperationsInput | string
    filesToModify?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type DelegationRecordUpsertWithWhereUniqueWithoutSubtaskInput = {
    where: DelegationRecordWhereUniqueInput
    update: XOR<DelegationRecordUpdateWithoutSubtaskInput, DelegationRecordUncheckedUpdateWithoutSubtaskInput>
    create: XOR<DelegationRecordCreateWithoutSubtaskInput, DelegationRecordUncheckedCreateWithoutSubtaskInput>
  }

  export type DelegationRecordUpdateWithWhereUniqueWithoutSubtaskInput = {
    where: DelegationRecordWhereUniqueInput
    data: XOR<DelegationRecordUpdateWithoutSubtaskInput, DelegationRecordUncheckedUpdateWithoutSubtaskInput>
  }

  export type DelegationRecordUpdateManyWithWhereWithoutSubtaskInput = {
    where: DelegationRecordScalarWhereInput
    data: XOR<DelegationRecordUpdateManyMutationInput, DelegationRecordUncheckedUpdateManyWithoutSubtaskInput>
  }

  export type CommentUpsertWithWhereUniqueWithoutSubtaskInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutSubtaskInput, CommentUncheckedUpdateWithoutSubtaskInput>
    create: XOR<CommentCreateWithoutSubtaskInput, CommentUncheckedCreateWithoutSubtaskInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutSubtaskInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutSubtaskInput, CommentUncheckedUpdateWithoutSubtaskInput>
  }

  export type CommentUpdateManyWithWhereWithoutSubtaskInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutSubtaskInput>
  }

  export type TaskCreateWithoutDelegationRecordsInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportCreateNestedManyWithoutTaskInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisCreateNestedOneWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutDelegationRecordsInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionUncheckedCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanUncheckedCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportUncheckedCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewUncheckedCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionUncheckedCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedCreateNestedOneWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutDelegationRecordsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutDelegationRecordsInput, TaskUncheckedCreateWithoutDelegationRecordsInput>
  }

  export type SubtaskCreateWithoutDelegationRecordsInput = {
    name: string
    description: string
    sequenceNumber: number
    status: string
    assignedTo?: string | null
    estimatedDuration?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    batchId?: string | null
    batchTitle?: string | null
    task: TaskCreateNestedOneWithoutSubtasksInput
    plan: ImplementationPlanCreateNestedOneWithoutSubtasksInput
    comments?: CommentCreateNestedManyWithoutSubtaskInput
  }

  export type SubtaskUncheckedCreateWithoutDelegationRecordsInput = {
    id?: number
    taskId: string
    planId: number
    name: string
    description: string
    sequenceNumber: number
    status: string
    assignedTo?: string | null
    estimatedDuration?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    batchId?: string | null
    batchTitle?: string | null
    comments?: CommentUncheckedCreateNestedManyWithoutSubtaskInput
  }

  export type SubtaskCreateOrConnectWithoutDelegationRecordsInput = {
    where: SubtaskWhereUniqueInput
    create: XOR<SubtaskCreateWithoutDelegationRecordsInput, SubtaskUncheckedCreateWithoutDelegationRecordsInput>
  }

  export type TaskUpsertWithoutDelegationRecordsInput = {
    update: XOR<TaskUpdateWithoutDelegationRecordsInput, TaskUncheckedUpdateWithoutDelegationRecordsInput>
    create: XOR<TaskCreateWithoutDelegationRecordsInput, TaskUncheckedCreateWithoutDelegationRecordsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutDelegationRecordsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutDelegationRecordsInput, TaskUncheckedUpdateWithoutDelegationRecordsInput>
  }

  export type TaskUpdateWithoutDelegationRecordsInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUpdateManyWithoutTaskNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUpdateOneWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutDelegationRecordsInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUncheckedUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUncheckedUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUncheckedUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUncheckedUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUncheckedUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedUpdateOneWithoutTaskNestedInput
  }

  export type SubtaskUpsertWithoutDelegationRecordsInput = {
    update: XOR<SubtaskUpdateWithoutDelegationRecordsInput, SubtaskUncheckedUpdateWithoutDelegationRecordsInput>
    create: XOR<SubtaskCreateWithoutDelegationRecordsInput, SubtaskUncheckedCreateWithoutDelegationRecordsInput>
    where?: SubtaskWhereInput
  }

  export type SubtaskUpdateToOneWithWhereWithoutDelegationRecordsInput = {
    where?: SubtaskWhereInput
    data: XOR<SubtaskUpdateWithoutDelegationRecordsInput, SubtaskUncheckedUpdateWithoutDelegationRecordsInput>
  }

  export type SubtaskUpdateWithoutDelegationRecordsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDuration?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTitle?: NullableStringFieldUpdateOperationsInput | string | null
    task?: TaskUpdateOneRequiredWithoutSubtasksNestedInput
    plan?: ImplementationPlanUpdateOneRequiredWithoutSubtasksNestedInput
    comments?: CommentUpdateManyWithoutSubtaskNestedInput
  }

  export type SubtaskUncheckedUpdateWithoutDelegationRecordsInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    planId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDuration?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTitle?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: CommentUncheckedUpdateManyWithoutSubtaskNestedInput
  }

  export type TaskCreateWithoutResearchReportsInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportCreateNestedManyWithoutTaskInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisCreateNestedOneWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutResearchReportsInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionUncheckedCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanUncheckedCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordUncheckedCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewUncheckedCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionUncheckedCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedCreateNestedOneWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutResearchReportsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutResearchReportsInput, TaskUncheckedCreateWithoutResearchReportsInput>
  }

  export type TaskUpsertWithoutResearchReportsInput = {
    update: XOR<TaskUpdateWithoutResearchReportsInput, TaskUncheckedUpdateWithoutResearchReportsInput>
    create: XOR<TaskCreateWithoutResearchReportsInput, TaskUncheckedCreateWithoutResearchReportsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutResearchReportsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutResearchReportsInput, TaskUncheckedUpdateWithoutResearchReportsInput>
  }

  export type TaskUpdateWithoutResearchReportsInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUpdateManyWithoutTaskNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUpdateOneWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutResearchReportsInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUncheckedUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUncheckedUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUncheckedUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUncheckedUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUncheckedUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedUpdateOneWithoutTaskNestedInput
  }

  export type TaskCreateWithoutCodeReviewsInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportCreateNestedManyWithoutTaskInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisCreateNestedOneWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutCodeReviewsInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionUncheckedCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanUncheckedCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordUncheckedCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportUncheckedCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionUncheckedCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedCreateNestedOneWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutCodeReviewsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutCodeReviewsInput, TaskUncheckedCreateWithoutCodeReviewsInput>
  }

  export type TaskUpsertWithoutCodeReviewsInput = {
    update: XOR<TaskUpdateWithoutCodeReviewsInput, TaskUncheckedUpdateWithoutCodeReviewsInput>
    create: XOR<TaskCreateWithoutCodeReviewsInput, TaskUncheckedCreateWithoutCodeReviewsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutCodeReviewsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutCodeReviewsInput, TaskUncheckedUpdateWithoutCodeReviewsInput>
  }

  export type TaskUpdateWithoutCodeReviewsInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUpdateManyWithoutTaskNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUpdateOneWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutCodeReviewsInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUncheckedUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUncheckedUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUncheckedUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUncheckedUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUncheckedUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedUpdateOneWithoutTaskNestedInput
  }

  export type TaskCreateWithoutCompletionReportsInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewCreateNestedManyWithoutTaskInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisCreateNestedOneWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutCompletionReportsInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionUncheckedCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanUncheckedCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordUncheckedCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportUncheckedCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionUncheckedCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedCreateNestedOneWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutCompletionReportsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutCompletionReportsInput, TaskUncheckedCreateWithoutCompletionReportsInput>
  }

  export type TaskUpsertWithoutCompletionReportsInput = {
    update: XOR<TaskUpdateWithoutCompletionReportsInput, TaskUncheckedUpdateWithoutCompletionReportsInput>
    create: XOR<TaskCreateWithoutCompletionReportsInput, TaskUncheckedCreateWithoutCompletionReportsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutCompletionReportsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutCompletionReportsInput, TaskUncheckedUpdateWithoutCompletionReportsInput>
  }

  export type TaskUpdateWithoutCompletionReportsInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUpdateManyWithoutTaskNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUpdateOneWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutCompletionReportsInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUncheckedUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUncheckedUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUncheckedUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUncheckedUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUncheckedUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedUpdateOneWithoutTaskNestedInput
  }

  export type TaskCreateWithoutCommentsInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisCreateNestedOneWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutCommentsInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionUncheckedCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanUncheckedCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordUncheckedCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportUncheckedCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewUncheckedCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportUncheckedCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionUncheckedCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedCreateNestedOneWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutCommentsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>
  }

  export type SubtaskCreateWithoutCommentsInput = {
    name: string
    description: string
    sequenceNumber: number
    status: string
    assignedTo?: string | null
    estimatedDuration?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    batchId?: string | null
    batchTitle?: string | null
    task: TaskCreateNestedOneWithoutSubtasksInput
    plan: ImplementationPlanCreateNestedOneWithoutSubtasksInput
    delegationRecords?: DelegationRecordCreateNestedManyWithoutSubtaskInput
  }

  export type SubtaskUncheckedCreateWithoutCommentsInput = {
    id?: number
    taskId: string
    planId: number
    name: string
    description: string
    sequenceNumber: number
    status: string
    assignedTo?: string | null
    estimatedDuration?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    batchId?: string | null
    batchTitle?: string | null
    delegationRecords?: DelegationRecordUncheckedCreateNestedManyWithoutSubtaskInput
  }

  export type SubtaskCreateOrConnectWithoutCommentsInput = {
    where: SubtaskWhereUniqueInput
    create: XOR<SubtaskCreateWithoutCommentsInput, SubtaskUncheckedCreateWithoutCommentsInput>
  }

  export type TaskUpsertWithoutCommentsInput = {
    update: XOR<TaskUpdateWithoutCommentsInput, TaskUncheckedUpdateWithoutCommentsInput>
    create: XOR<TaskCreateWithoutCommentsInput, TaskUncheckedCreateWithoutCommentsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutCommentsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutCommentsInput, TaskUncheckedUpdateWithoutCommentsInput>
  }

  export type TaskUpdateWithoutCommentsInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUpdateOneWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutCommentsInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUncheckedUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUncheckedUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUncheckedUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUncheckedUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUncheckedUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUncheckedUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUncheckedUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedUpdateOneWithoutTaskNestedInput
  }

  export type SubtaskUpsertWithoutCommentsInput = {
    update: XOR<SubtaskUpdateWithoutCommentsInput, SubtaskUncheckedUpdateWithoutCommentsInput>
    create: XOR<SubtaskCreateWithoutCommentsInput, SubtaskUncheckedCreateWithoutCommentsInput>
    where?: SubtaskWhereInput
  }

  export type SubtaskUpdateToOneWithWhereWithoutCommentsInput = {
    where?: SubtaskWhereInput
    data: XOR<SubtaskUpdateWithoutCommentsInput, SubtaskUncheckedUpdateWithoutCommentsInput>
  }

  export type SubtaskUpdateWithoutCommentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDuration?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTitle?: NullableStringFieldUpdateOperationsInput | string | null
    task?: TaskUpdateOneRequiredWithoutSubtasksNestedInput
    plan?: ImplementationPlanUpdateOneRequiredWithoutSubtasksNestedInput
    delegationRecords?: DelegationRecordUpdateManyWithoutSubtaskNestedInput
  }

  export type SubtaskUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    planId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDuration?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTitle?: NullableStringFieldUpdateOperationsInput | string | null
    delegationRecords?: DelegationRecordUncheckedUpdateManyWithoutSubtaskNestedInput
  }

  export type TaskCreateWithoutWorkflowTransitionsInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportCreateNestedManyWithoutTaskInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisCreateNestedOneWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutWorkflowTransitionsInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionUncheckedCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanUncheckedCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordUncheckedCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportUncheckedCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewUncheckedCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedCreateNestedOneWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutWorkflowTransitionsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutWorkflowTransitionsInput, TaskUncheckedCreateWithoutWorkflowTransitionsInput>
  }

  export type TaskUpsertWithoutWorkflowTransitionsInput = {
    update: XOR<TaskUpdateWithoutWorkflowTransitionsInput, TaskUncheckedUpdateWithoutWorkflowTransitionsInput>
    create: XOR<TaskCreateWithoutWorkflowTransitionsInput, TaskUncheckedCreateWithoutWorkflowTransitionsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutWorkflowTransitionsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutWorkflowTransitionsInput, TaskUncheckedUpdateWithoutWorkflowTransitionsInput>
  }

  export type TaskUpdateWithoutWorkflowTransitionsInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUpdateManyWithoutTaskNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUpdateOneWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutWorkflowTransitionsInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUncheckedUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUncheckedUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUncheckedUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUncheckedUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUncheckedUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    codebaseAnalysis?: CodebaseAnalysisUncheckedUpdateOneWithoutTaskNestedInput
  }

  export type TaskCreateWithoutCodebaseAnalysisInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportCreateNestedManyWithoutTaskInput
    comments?: CommentCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutCodebaseAnalysisInput = {
    taskId: string
    name: string
    status: string
    creationDate?: Date | string
    completionDate?: Date | string | null
    owner?: string | null
    currentMode?: string | null
    priority?: string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: number
    gitBranch?: string | null
    taskDescription?: TaskDescriptionUncheckedCreateNestedOneWithoutTaskInput
    implementationPlans?: ImplementationPlanUncheckedCreateNestedManyWithoutTaskInput
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    delegationRecords?: DelegationRecordUncheckedCreateNestedManyWithoutTaskInput
    researchReports?: ResearchReportUncheckedCreateNestedManyWithoutTaskInput
    codeReviews?: CodeReviewUncheckedCreateNestedManyWithoutTaskInput
    completionReports?: CompletionReportUncheckedCreateNestedManyWithoutTaskInput
    comments?: CommentUncheckedCreateNestedManyWithoutTaskInput
    workflowTransitions?: WorkflowTransitionUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutCodebaseAnalysisInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutCodebaseAnalysisInput, TaskUncheckedCreateWithoutCodebaseAnalysisInput>
  }

  export type TaskUpsertWithoutCodebaseAnalysisInput = {
    update: XOR<TaskUpdateWithoutCodebaseAnalysisInput, TaskUncheckedUpdateWithoutCodebaseAnalysisInput>
    create: XOR<TaskCreateWithoutCodebaseAnalysisInput, TaskUncheckedCreateWithoutCodebaseAnalysisInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutCodebaseAnalysisInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutCodebaseAnalysisInput, TaskUncheckedUpdateWithoutCodebaseAnalysisInput>
  }

  export type TaskUpdateWithoutCodebaseAnalysisInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUpdateManyWithoutTaskNestedInput
    comments?: CommentUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutCodebaseAnalysisInput = {
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    completionDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    currentMode?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    dependencies?: NullableJsonNullValueInput | InputJsonValue
    redelegationCount?: IntFieldUpdateOperationsInput | number
    gitBranch?: NullableStringFieldUpdateOperationsInput | string | null
    taskDescription?: TaskDescriptionUncheckedUpdateOneWithoutTaskNestedInput
    implementationPlans?: ImplementationPlanUncheckedUpdateManyWithoutTaskNestedInput
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    delegationRecords?: DelegationRecordUncheckedUpdateManyWithoutTaskNestedInput
    researchReports?: ResearchReportUncheckedUpdateManyWithoutTaskNestedInput
    codeReviews?: CodeReviewUncheckedUpdateManyWithoutTaskNestedInput
    completionReports?: CompletionReportUncheckedUpdateManyWithoutTaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutTaskNestedInput
    workflowTransitions?: WorkflowTransitionUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type ImplementationPlanCreateManyTaskInput = {
    id?: number
    overview: string
    approach: string
    technicalDecisions: string
    filesToModify: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
  }

  export type SubtaskCreateManyTaskInput = {
    id?: number
    planId: number
    name: string
    description: string
    sequenceNumber: number
    status: string
    assignedTo?: string | null
    estimatedDuration?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    batchId?: string | null
    batchTitle?: string | null
  }

  export type DelegationRecordCreateManyTaskInput = {
    id?: number
    subtaskId?: number | null
    fromMode: string
    toMode: string
    delegationTimestamp?: Date | string
    completionTimestamp?: Date | string | null
    success?: boolean | null
    rejectionReason?: string | null
    redelegationCount?: number
  }

  export type ResearchReportCreateManyTaskInput = {
    id?: number
    title: string
    summary: string
    findings: string
    recommendations: string
    references: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CodeReviewCreateManyTaskInput = {
    id?: number
    status: string
    summary: string
    strengths: string
    issues: string
    acceptanceCriteriaVerification: JsonNullValueInput | InputJsonValue
    manualTestingResults: string
    requiredChanges?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompletionReportCreateManyTaskInput = {
    id?: number
    summary: string
    filesModified: JsonNullValueInput | InputJsonValue
    delegationSummary: string
    acceptanceCriteriaVerification: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CommentCreateManyTaskInput = {
    id?: number
    subtaskId?: number | null
    mode: string
    content: string
    createdAt?: Date | string
  }

  export type WorkflowTransitionCreateManyTaskInput = {
    id?: number
    fromMode: string
    toMode: string
    transitionTimestamp?: Date | string
    reason?: string | null
  }

  export type ImplementationPlanUpdateWithoutTaskInput = {
    overview?: StringFieldUpdateOperationsInput | string
    approach?: StringFieldUpdateOperationsInput | string
    technicalDecisions?: StringFieldUpdateOperationsInput | string
    filesToModify?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    subtasks?: SubtaskUpdateManyWithoutPlanNestedInput
  }

  export type ImplementationPlanUncheckedUpdateWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    overview?: StringFieldUpdateOperationsInput | string
    approach?: StringFieldUpdateOperationsInput | string
    technicalDecisions?: StringFieldUpdateOperationsInput | string
    filesToModify?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    subtasks?: SubtaskUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type ImplementationPlanUncheckedUpdateManyWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    overview?: StringFieldUpdateOperationsInput | string
    approach?: StringFieldUpdateOperationsInput | string
    technicalDecisions?: StringFieldUpdateOperationsInput | string
    filesToModify?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type SubtaskUpdateWithoutTaskInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDuration?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTitle?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: ImplementationPlanUpdateOneRequiredWithoutSubtasksNestedInput
    delegationRecords?: DelegationRecordUpdateManyWithoutSubtaskNestedInput
    comments?: CommentUpdateManyWithoutSubtaskNestedInput
  }

  export type SubtaskUncheckedUpdateWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    planId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDuration?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTitle?: NullableStringFieldUpdateOperationsInput | string | null
    delegationRecords?: DelegationRecordUncheckedUpdateManyWithoutSubtaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutSubtaskNestedInput
  }

  export type SubtaskUncheckedUpdateManyWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    planId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDuration?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTitle?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DelegationRecordUpdateWithoutTaskInput = {
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    delegationTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    completionTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    success?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    redelegationCount?: IntFieldUpdateOperationsInput | number
    subtask?: SubtaskUpdateOneWithoutDelegationRecordsNestedInput
  }

  export type DelegationRecordUncheckedUpdateWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    subtaskId?: NullableIntFieldUpdateOperationsInput | number | null
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    delegationTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    completionTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    success?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    redelegationCount?: IntFieldUpdateOperationsInput | number
  }

  export type DelegationRecordUncheckedUpdateManyWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    subtaskId?: NullableIntFieldUpdateOperationsInput | number | null
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    delegationTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    completionTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    success?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    redelegationCount?: IntFieldUpdateOperationsInput | number
  }

  export type ResearchReportUpdateWithoutTaskInput = {
    title?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    findings?: StringFieldUpdateOperationsInput | string
    recommendations?: StringFieldUpdateOperationsInput | string
    references?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResearchReportUncheckedUpdateWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    findings?: StringFieldUpdateOperationsInput | string
    recommendations?: StringFieldUpdateOperationsInput | string
    references?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResearchReportUncheckedUpdateManyWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    findings?: StringFieldUpdateOperationsInput | string
    recommendations?: StringFieldUpdateOperationsInput | string
    references?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeReviewUpdateWithoutTaskInput = {
    status?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    strengths?: StringFieldUpdateOperationsInput | string
    issues?: StringFieldUpdateOperationsInput | string
    acceptanceCriteriaVerification?: JsonNullValueInput | InputJsonValue
    manualTestingResults?: StringFieldUpdateOperationsInput | string
    requiredChanges?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeReviewUncheckedUpdateWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    strengths?: StringFieldUpdateOperationsInput | string
    issues?: StringFieldUpdateOperationsInput | string
    acceptanceCriteriaVerification?: JsonNullValueInput | InputJsonValue
    manualTestingResults?: StringFieldUpdateOperationsInput | string
    requiredChanges?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CodeReviewUncheckedUpdateManyWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    strengths?: StringFieldUpdateOperationsInput | string
    issues?: StringFieldUpdateOperationsInput | string
    acceptanceCriteriaVerification?: JsonNullValueInput | InputJsonValue
    manualTestingResults?: StringFieldUpdateOperationsInput | string
    requiredChanges?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompletionReportUpdateWithoutTaskInput = {
    summary?: StringFieldUpdateOperationsInput | string
    filesModified?: JsonNullValueInput | InputJsonValue
    delegationSummary?: StringFieldUpdateOperationsInput | string
    acceptanceCriteriaVerification?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompletionReportUncheckedUpdateWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    summary?: StringFieldUpdateOperationsInput | string
    filesModified?: JsonNullValueInput | InputJsonValue
    delegationSummary?: StringFieldUpdateOperationsInput | string
    acceptanceCriteriaVerification?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompletionReportUncheckedUpdateManyWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    summary?: StringFieldUpdateOperationsInput | string
    filesModified?: JsonNullValueInput | InputJsonValue
    delegationSummary?: StringFieldUpdateOperationsInput | string
    acceptanceCriteriaVerification?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutTaskInput = {
    mode?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subtask?: SubtaskUpdateOneWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    subtaskId?: NullableIntFieldUpdateOperationsInput | number | null
    mode?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    subtaskId?: NullableIntFieldUpdateOperationsInput | number | null
    mode?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowTransitionUpdateWithoutTaskInput = {
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    transitionTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkflowTransitionUncheckedUpdateWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    transitionTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkflowTransitionUncheckedUpdateManyWithoutTaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    transitionTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubtaskCreateManyPlanInput = {
    id?: number
    taskId: string
    name: string
    description: string
    sequenceNumber: number
    status: string
    assignedTo?: string | null
    estimatedDuration?: string | null
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    batchId?: string | null
    batchTitle?: string | null
  }

  export type SubtaskUpdateWithoutPlanInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDuration?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTitle?: NullableStringFieldUpdateOperationsInput | string | null
    task?: TaskUpdateOneRequiredWithoutSubtasksNestedInput
    delegationRecords?: DelegationRecordUpdateManyWithoutSubtaskNestedInput
    comments?: CommentUpdateManyWithoutSubtaskNestedInput
  }

  export type SubtaskUncheckedUpdateWithoutPlanInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDuration?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTitle?: NullableStringFieldUpdateOperationsInput | string | null
    delegationRecords?: DelegationRecordUncheckedUpdateManyWithoutSubtaskNestedInput
    comments?: CommentUncheckedUpdateManyWithoutSubtaskNestedInput
  }

  export type SubtaskUncheckedUpdateManyWithoutPlanInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sequenceNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDuration?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTitle?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DelegationRecordCreateManySubtaskInput = {
    id?: number
    taskId: string
    fromMode: string
    toMode: string
    delegationTimestamp?: Date | string
    completionTimestamp?: Date | string | null
    success?: boolean | null
    rejectionReason?: string | null
    redelegationCount?: number
  }

  export type CommentCreateManySubtaskInput = {
    id?: number
    taskId: string
    mode: string
    content: string
    createdAt?: Date | string
  }

  export type DelegationRecordUpdateWithoutSubtaskInput = {
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    delegationTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    completionTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    success?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    redelegationCount?: IntFieldUpdateOperationsInput | number
    task?: TaskUpdateOneRequiredWithoutDelegationRecordsNestedInput
  }

  export type DelegationRecordUncheckedUpdateWithoutSubtaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    delegationTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    completionTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    success?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    redelegationCount?: IntFieldUpdateOperationsInput | number
  }

  export type DelegationRecordUncheckedUpdateManyWithoutSubtaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    fromMode?: StringFieldUpdateOperationsInput | string
    toMode?: StringFieldUpdateOperationsInput | string
    delegationTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    completionTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    success?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    redelegationCount?: IntFieldUpdateOperationsInput | number
  }

  export type CommentUpdateWithoutSubtaskInput = {
    mode?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutSubtaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutSubtaskInput = {
    id?: IntFieldUpdateOperationsInput | number
    taskId?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}