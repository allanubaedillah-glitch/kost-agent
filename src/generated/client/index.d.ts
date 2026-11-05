
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
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model AdminUser
 * 
 */
export type AdminUser = $Result.DefaultSelection<Prisma.$AdminUserPayload>
/**
 * Model PartnerProperty
 * 
 */
export type PartnerProperty = $Result.DefaultSelection<Prisma.$PartnerPropertyPayload>
/**
 * Model PartnerRoom
 * 
 */
export type PartnerRoom = $Result.DefaultSelection<Prisma.$PartnerRoomPayload>
/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>
/**
 * Model PaymentSubmission
 * 
 */
export type PaymentSubmission = $Result.DefaultSelection<Prisma.$PaymentSubmissionPayload>
/**
 * Model RefundRequest
 * 
 */
export type RefundRequest = $Result.DefaultSelection<Prisma.$RefundRequestPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model SecurityAuditLog
 * 
 */
export type SecurityAuditLog = $Result.DefaultSelection<Prisma.$SecurityAuditLogPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Customers
 * const customers = await prisma.customer.findMany()
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
   * // Fetch zero or more Customers
   * const customers = await prisma.customer.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs>;

  /**
   * `prisma.adminUser`: Exposes CRUD operations for the **AdminUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminUsers
    * const adminUsers = await prisma.adminUser.findMany()
    * ```
    */
  get adminUser(): Prisma.AdminUserDelegate<ExtArgs>;

  /**
   * `prisma.partnerProperty`: Exposes CRUD operations for the **PartnerProperty** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PartnerProperties
    * const partnerProperties = await prisma.partnerProperty.findMany()
    * ```
    */
  get partnerProperty(): Prisma.PartnerPropertyDelegate<ExtArgs>;

  /**
   * `prisma.partnerRoom`: Exposes CRUD operations for the **PartnerRoom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PartnerRooms
    * const partnerRooms = await prisma.partnerRoom.findMany()
    * ```
    */
  get partnerRoom(): Prisma.PartnerRoomDelegate<ExtArgs>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs>;

  /**
   * `prisma.paymentSubmission`: Exposes CRUD operations for the **PaymentSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentSubmissions
    * const paymentSubmissions = await prisma.paymentSubmission.findMany()
    * ```
    */
  get paymentSubmission(): Prisma.PaymentSubmissionDelegate<ExtArgs>;

  /**
   * `prisma.refundRequest`: Exposes CRUD operations for the **RefundRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefundRequests
    * const refundRequests = await prisma.refundRequest.findMany()
    * ```
    */
  get refundRequest(): Prisma.RefundRequestDelegate<ExtArgs>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs>;

  /**
   * `prisma.securityAuditLog`: Exposes CRUD operations for the **SecurityAuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SecurityAuditLogs
    * const securityAuditLogs = await prisma.securityAuditLog.findMany()
    * ```
    */
  get securityAuditLog(): Prisma.SecurityAuditLogDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Customer: 'Customer',
    AdminUser: 'AdminUser',
    PartnerProperty: 'PartnerProperty',
    PartnerRoom: 'PartnerRoom',
    Booking: 'Booking',
    PaymentSubmission: 'PaymentSubmission',
    RefundRequest: 'RefundRequest',
    Review: 'Review',
    SecurityAuditLog: 'SecurityAuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "customer" | "adminUser" | "partnerProperty" | "partnerRoom" | "booking" | "paymentSubmission" | "refundRequest" | "review" | "securityAuditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      AdminUser: {
        payload: Prisma.$AdminUserPayload<ExtArgs>
        fields: Prisma.AdminUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findFirst: {
            args: Prisma.AdminUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findMany: {
            args: Prisma.AdminUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          create: {
            args: Prisma.AdminUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          createMany: {
            args: Prisma.AdminUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          delete: {
            args: Prisma.AdminUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          update: {
            args: Prisma.AdminUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          deleteMany: {
            args: Prisma.AdminUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          aggregate: {
            args: Prisma.AdminUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminUser>
          }
          groupBy: {
            args: Prisma.AdminUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminUserCountArgs<ExtArgs>
            result: $Utils.Optional<AdminUserCountAggregateOutputType> | number
          }
        }
      }
      PartnerProperty: {
        payload: Prisma.$PartnerPropertyPayload<ExtArgs>
        fields: Prisma.PartnerPropertyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartnerPropertyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPropertyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartnerPropertyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPropertyPayload>
          }
          findFirst: {
            args: Prisma.PartnerPropertyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPropertyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartnerPropertyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPropertyPayload>
          }
          findMany: {
            args: Prisma.PartnerPropertyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPropertyPayload>[]
          }
          create: {
            args: Prisma.PartnerPropertyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPropertyPayload>
          }
          createMany: {
            args: Prisma.PartnerPropertyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PartnerPropertyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPropertyPayload>[]
          }
          delete: {
            args: Prisma.PartnerPropertyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPropertyPayload>
          }
          update: {
            args: Prisma.PartnerPropertyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPropertyPayload>
          }
          deleteMany: {
            args: Prisma.PartnerPropertyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartnerPropertyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PartnerPropertyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPropertyPayload>
          }
          aggregate: {
            args: Prisma.PartnerPropertyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePartnerProperty>
          }
          groupBy: {
            args: Prisma.PartnerPropertyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartnerPropertyGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartnerPropertyCountArgs<ExtArgs>
            result: $Utils.Optional<PartnerPropertyCountAggregateOutputType> | number
          }
        }
      }
      PartnerRoom: {
        payload: Prisma.$PartnerRoomPayload<ExtArgs>
        fields: Prisma.PartnerRoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartnerRoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerRoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartnerRoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerRoomPayload>
          }
          findFirst: {
            args: Prisma.PartnerRoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerRoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartnerRoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerRoomPayload>
          }
          findMany: {
            args: Prisma.PartnerRoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerRoomPayload>[]
          }
          create: {
            args: Prisma.PartnerRoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerRoomPayload>
          }
          createMany: {
            args: Prisma.PartnerRoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PartnerRoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerRoomPayload>[]
          }
          delete: {
            args: Prisma.PartnerRoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerRoomPayload>
          }
          update: {
            args: Prisma.PartnerRoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerRoomPayload>
          }
          deleteMany: {
            args: Prisma.PartnerRoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartnerRoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PartnerRoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerRoomPayload>
          }
          aggregate: {
            args: Prisma.PartnerRoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePartnerRoom>
          }
          groupBy: {
            args: Prisma.PartnerRoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartnerRoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartnerRoomCountArgs<ExtArgs>
            result: $Utils.Optional<PartnerRoomCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
      PaymentSubmission: {
        payload: Prisma.$PaymentSubmissionPayload<ExtArgs>
        fields: Prisma.PaymentSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentSubmissionPayload>
          }
          findFirst: {
            args: Prisma.PaymentSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentSubmissionPayload>
          }
          findMany: {
            args: Prisma.PaymentSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentSubmissionPayload>[]
          }
          create: {
            args: Prisma.PaymentSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentSubmissionPayload>
          }
          createMany: {
            args: Prisma.PaymentSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentSubmissionPayload>[]
          }
          delete: {
            args: Prisma.PaymentSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentSubmissionPayload>
          }
          update: {
            args: Prisma.PaymentSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.PaymentSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentSubmissionPayload>
          }
          aggregate: {
            args: Prisma.PaymentSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentSubmission>
          }
          groupBy: {
            args: Prisma.PaymentSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentSubmissionCountAggregateOutputType> | number
          }
        }
      }
      RefundRequest: {
        payload: Prisma.$RefundRequestPayload<ExtArgs>
        fields: Prisma.RefundRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefundRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefundRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          findFirst: {
            args: Prisma.RefundRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefundRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          findMany: {
            args: Prisma.RefundRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>[]
          }
          create: {
            args: Prisma.RefundRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          createMany: {
            args: Prisma.RefundRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefundRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>[]
          }
          delete: {
            args: Prisma.RefundRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          update: {
            args: Prisma.RefundRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          deleteMany: {
            args: Prisma.RefundRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefundRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RefundRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          aggregate: {
            args: Prisma.RefundRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefundRequest>
          }
          groupBy: {
            args: Prisma.RefundRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefundRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefundRequestCountArgs<ExtArgs>
            result: $Utils.Optional<RefundRequestCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      SecurityAuditLog: {
        payload: Prisma.$SecurityAuditLogPayload<ExtArgs>
        fields: Prisma.SecurityAuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SecurityAuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SecurityAuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAuditLogPayload>
          }
          findFirst: {
            args: Prisma.SecurityAuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SecurityAuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAuditLogPayload>
          }
          findMany: {
            args: Prisma.SecurityAuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAuditLogPayload>[]
          }
          create: {
            args: Prisma.SecurityAuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAuditLogPayload>
          }
          createMany: {
            args: Prisma.SecurityAuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SecurityAuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAuditLogPayload>[]
          }
          delete: {
            args: Prisma.SecurityAuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAuditLogPayload>
          }
          update: {
            args: Prisma.SecurityAuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAuditLogPayload>
          }
          deleteMany: {
            args: Prisma.SecurityAuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SecurityAuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SecurityAuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAuditLogPayload>
          }
          aggregate: {
            args: Prisma.SecurityAuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSecurityAuditLog>
          }
          groupBy: {
            args: Prisma.SecurityAuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SecurityAuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SecurityAuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<SecurityAuditLogCountAggregateOutputType> | number
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
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    bookings: number
    reviews: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | CustomerCountOutputTypeCountBookingsArgs
    reviews?: boolean | CustomerCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type AdminUserCountOutputType
   */

  export type AdminUserCountOutputType = {
    auditLogs: number
  }

  export type AdminUserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditLogs?: boolean | AdminUserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * AdminUserCountOutputType without action
   */
  export type AdminUserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUserCountOutputType
     */
    select?: AdminUserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AdminUserCountOutputType without action
   */
  export type AdminUserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SecurityAuditLogWhereInput
  }


  /**
   * Count Type PartnerPropertyCountOutputType
   */

  export type PartnerPropertyCountOutputType = {
    rooms: number
    bookings: number
    reviews: number
  }

  export type PartnerPropertyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rooms?: boolean | PartnerPropertyCountOutputTypeCountRoomsArgs
    bookings?: boolean | PartnerPropertyCountOutputTypeCountBookingsArgs
    reviews?: boolean | PartnerPropertyCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * PartnerPropertyCountOutputType without action
   */
  export type PartnerPropertyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerPropertyCountOutputType
     */
    select?: PartnerPropertyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PartnerPropertyCountOutputType without action
   */
  export type PartnerPropertyCountOutputTypeCountRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartnerRoomWhereInput
  }

  /**
   * PartnerPropertyCountOutputType without action
   */
  export type PartnerPropertyCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }

  /**
   * PartnerPropertyCountOutputType without action
   */
  export type PartnerPropertyCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type PartnerRoomCountOutputType
   */

  export type PartnerRoomCountOutputType = {
    bookings: number
  }

  export type PartnerRoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | PartnerRoomCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * PartnerRoomCountOutputType without action
   */
  export type PartnerRoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerRoomCountOutputType
     */
    select?: PartnerRoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PartnerRoomCountOutputType without action
   */
  export type PartnerRoomCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    phoneNumber: string | null
    isVerified: boolean | null
    verificationToken: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    phoneNumber: string | null
    isVerified: boolean | null
    verificationToken: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    fullName: number
    phoneNumber: number
    isVerified: number
    verificationToken: number
    avatarUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    phoneNumber?: true
    isVerified?: true
    verificationToken?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    phoneNumber?: true
    isVerified?: true
    verificationToken?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    phoneNumber?: true
    isVerified?: true
    verificationToken?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    fullName: string
    phoneNumber: string
    isVerified: boolean
    verificationToken: string | null
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    phoneNumber?: boolean
    isVerified?: boolean
    verificationToken?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bookings?: boolean | Customer$bookingsArgs<ExtArgs>
    reviews?: boolean | Customer$reviewsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    phoneNumber?: boolean
    isVerified?: boolean
    verificationToken?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    phoneNumber?: boolean
    isVerified?: boolean
    verificationToken?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | Customer$bookingsArgs<ExtArgs>
    reviews?: boolean | Customer$reviewsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      bookings: Prisma.$BookingPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      fullName: string
      phoneNumber: string
      isVerified: boolean
      verificationToken: string | null
      avatarUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
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
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookings<T extends Customer$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany"> | Null>
    reviews<T extends Customer$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Customer model
   */ 
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly passwordHash: FieldRef<"Customer", 'String'>
    readonly fullName: FieldRef<"Customer", 'String'>
    readonly phoneNumber: FieldRef<"Customer", 'String'>
    readonly isVerified: FieldRef<"Customer", 'Boolean'>
    readonly verificationToken: FieldRef<"Customer", 'String'>
    readonly avatarUrl: FieldRef<"Customer", 'String'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
  }

  /**
   * Customer.bookings
   */
  export type Customer$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Customer.reviews
   */
  export type Customer$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model AdminUser
   */

  export type AggregateAdminUser = {
    _count: AdminUserCountAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  export type AdminUserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminUserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminUserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    fullName: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminUserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminUserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminUserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUser to aggregate.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminUsers
    **/
    _count?: true | AdminUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminUserMaxAggregateInputType
  }

  export type GetAdminUserAggregateType<T extends AdminUserAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminUser[P]>
      : GetScalarType<T[P], AggregateAdminUser[P]>
  }




  export type AdminUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminUserWhereInput
    orderBy?: AdminUserOrderByWithAggregationInput | AdminUserOrderByWithAggregationInput[]
    by: AdminUserScalarFieldEnum[] | AdminUserScalarFieldEnum
    having?: AdminUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminUserCountAggregateInputType | true
    _min?: AdminUserMinAggregateInputType
    _max?: AdminUserMaxAggregateInputType
  }

  export type AdminUserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    fullName: string
    role: string
    createdAt: Date
    updatedAt: Date
    _count: AdminUserCountAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  type GetAdminUserGroupByPayload<T extends AdminUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
            : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
        }
      >
    >


  export type AdminUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    auditLogs?: boolean | AdminUser$auditLogsArgs<ExtArgs>
    _count?: boolean | AdminUserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditLogs?: boolean | AdminUser$auditLogsArgs<ExtArgs>
    _count?: boolean | AdminUserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AdminUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AdminUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminUser"
    objects: {
      auditLogs: Prisma.$SecurityAuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      fullName: string
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["adminUser"]>
    composites: {}
  }

  type AdminUserGetPayload<S extends boolean | null | undefined | AdminUserDefaultArgs> = $Result.GetResult<Prisma.$AdminUserPayload, S>

  type AdminUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AdminUserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AdminUserCountAggregateInputType | true
    }

  export interface AdminUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminUser'], meta: { name: 'AdminUser' } }
    /**
     * Find zero or one AdminUser that matches the filter.
     * @param {AdminUserFindUniqueArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminUserFindUniqueArgs>(args: SelectSubset<T, AdminUserFindUniqueArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AdminUser that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AdminUserFindUniqueOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminUserFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AdminUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminUserFindFirstArgs>(args?: SelectSubset<T, AdminUserFindFirstArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AdminUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminUserFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AdminUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminUsers
     * const adminUsers = await prisma.adminUser.findMany()
     * 
     * // Get first 10 AdminUsers
     * const adminUsers = await prisma.adminUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminUserFindManyArgs>(args?: SelectSubset<T, AdminUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AdminUser.
     * @param {AdminUserCreateArgs} args - Arguments to create a AdminUser.
     * @example
     * // Create one AdminUser
     * const AdminUser = await prisma.adminUser.create({
     *   data: {
     *     // ... data to create a AdminUser
     *   }
     * })
     * 
     */
    create<T extends AdminUserCreateArgs>(args: SelectSubset<T, AdminUserCreateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AdminUsers.
     * @param {AdminUserCreateManyArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminUserCreateManyArgs>(args?: SelectSubset<T, AdminUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminUsers and returns the data saved in the database.
     * @param {AdminUserCreateManyAndReturnArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminUsers and only return the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminUserCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AdminUser.
     * @param {AdminUserDeleteArgs} args - Arguments to delete one AdminUser.
     * @example
     * // Delete one AdminUser
     * const AdminUser = await prisma.adminUser.delete({
     *   where: {
     *     // ... filter to delete one AdminUser
     *   }
     * })
     * 
     */
    delete<T extends AdminUserDeleteArgs>(args: SelectSubset<T, AdminUserDeleteArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AdminUser.
     * @param {AdminUserUpdateArgs} args - Arguments to update one AdminUser.
     * @example
     * // Update one AdminUser
     * const adminUser = await prisma.adminUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUserUpdateArgs>(args: SelectSubset<T, AdminUserUpdateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AdminUsers.
     * @param {AdminUserDeleteManyArgs} args - Arguments to filter AdminUsers to delete.
     * @example
     * // Delete a few AdminUsers
     * const { count } = await prisma.adminUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminUserDeleteManyArgs>(args?: SelectSubset<T, AdminUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminUsers
     * const adminUser = await prisma.adminUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUserUpdateManyArgs>(args: SelectSubset<T, AdminUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AdminUser.
     * @param {AdminUserUpsertArgs} args - Arguments to update or create a AdminUser.
     * @example
     * // Update or create a AdminUser
     * const adminUser = await prisma.adminUser.upsert({
     *   create: {
     *     // ... data to create a AdminUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminUser we want to update
     *   }
     * })
     */
    upsert<T extends AdminUserUpsertArgs>(args: SelectSubset<T, AdminUserUpsertArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserCountArgs} args - Arguments to filter AdminUsers to count.
     * @example
     * // Count the number of AdminUsers
     * const count = await prisma.adminUser.count({
     *   where: {
     *     // ... the filter for the AdminUsers we want to count
     *   }
     * })
    **/
    count<T extends AdminUserCountArgs>(
      args?: Subset<T, AdminUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminUserAggregateArgs>(args: Subset<T, AdminUserAggregateArgs>): Prisma.PrismaPromise<GetAdminUserAggregateType<T>>

    /**
     * Group by AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserGroupByArgs} args - Group by arguments.
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
      T extends AdminUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminUserGroupByArgs['orderBy'] }
        : { orderBy?: AdminUserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdminUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminUser model
   */
  readonly fields: AdminUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auditLogs<T extends AdminUser$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, AdminUser$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityAuditLogPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the AdminUser model
   */ 
  interface AdminUserFieldRefs {
    readonly id: FieldRef<"AdminUser", 'String'>
    readonly email: FieldRef<"AdminUser", 'String'>
    readonly passwordHash: FieldRef<"AdminUser", 'String'>
    readonly fullName: FieldRef<"AdminUser", 'String'>
    readonly role: FieldRef<"AdminUser", 'String'>
    readonly createdAt: FieldRef<"AdminUser", 'DateTime'>
    readonly updatedAt: FieldRef<"AdminUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminUser findUnique
   */
  export type AdminUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findUniqueOrThrow
   */
  export type AdminUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findFirst
   */
  export type AdminUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findFirstOrThrow
   */
  export type AdminUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findMany
   */
  export type AdminUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUsers to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser create
   */
  export type AdminUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The data needed to create a AdminUser.
     */
    data: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
  }

  /**
   * AdminUser createMany
   */
  export type AdminUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminUser createManyAndReturn
   */
  export type AdminUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminUser update
   */
  export type AdminUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The data needed to update a AdminUser.
     */
    data: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
    /**
     * Choose, which AdminUser to update.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser updateMany
   */
  export type AdminUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminUsers.
     */
    data: XOR<AdminUserUpdateManyMutationInput, AdminUserUncheckedUpdateManyInput>
    /**
     * Filter which AdminUsers to update
     */
    where?: AdminUserWhereInput
  }

  /**
   * AdminUser upsert
   */
  export type AdminUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The filter to search for the AdminUser to update in case it exists.
     */
    where: AdminUserWhereUniqueInput
    /**
     * In case the AdminUser found by the `where` argument doesn't exist, create a new AdminUser with this data.
     */
    create: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
    /**
     * In case the AdminUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
  }

  /**
   * AdminUser delete
   */
  export type AdminUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter which AdminUser to delete.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser deleteMany
   */
  export type AdminUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUsers to delete
     */
    where?: AdminUserWhereInput
  }

  /**
   * AdminUser.auditLogs
   */
  export type AdminUser$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAuditLog
     */
    select?: SecurityAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityAuditLogInclude<ExtArgs> | null
    where?: SecurityAuditLogWhereInput
    orderBy?: SecurityAuditLogOrderByWithRelationInput | SecurityAuditLogOrderByWithRelationInput[]
    cursor?: SecurityAuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SecurityAuditLogScalarFieldEnum | SecurityAuditLogScalarFieldEnum[]
  }

  /**
   * AdminUser without action
   */
  export type AdminUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
  }


  /**
   * Model PartnerProperty
   */

  export type AggregatePartnerProperty = {
    _count: PartnerPropertyCountAggregateOutputType | null
    _avg: PartnerPropertyAvgAggregateOutputType | null
    _sum: PartnerPropertySumAggregateOutputType | null
    _min: PartnerPropertyMinAggregateOutputType | null
    _max: PartnerPropertyMaxAggregateOutputType | null
  }

  export type PartnerPropertyAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    avgRating: number | null
    totalReviews: number | null
  }

  export type PartnerPropertySumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    avgRating: number | null
    totalReviews: number | null
  }

  export type PartnerPropertyMinAggregateOutputType = {
    id: string | null
    kmPropertyId: string | null
    ownerName: string | null
    ownerPhone: string | null
    ownerWhatsapp: string | null
    name: string | null
    slug: string | null
    address: string | null
    city: string | null
    district: string | null
    latitude: number | null
    longitude: number | null
    description: string | null
    genderType: string | null
    generalFacilities: string | null
    photos: string | null
    termsAndRules: string | null
    requirementsSchema: string | null
    paymentBankName: string | null
    paymentAccountNumber: string | null
    paymentAccountHolder: string | null
    paymentQrisUrl: string | null
    partnershipStatus: string | null
    rejectionReason: string | null
    avgRating: number | null
    totalReviews: number | null
    lastSyncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerPropertyMaxAggregateOutputType = {
    id: string | null
    kmPropertyId: string | null
    ownerName: string | null
    ownerPhone: string | null
    ownerWhatsapp: string | null
    name: string | null
    slug: string | null
    address: string | null
    city: string | null
    district: string | null
    latitude: number | null
    longitude: number | null
    description: string | null
    genderType: string | null
    generalFacilities: string | null
    photos: string | null
    termsAndRules: string | null
    requirementsSchema: string | null
    paymentBankName: string | null
    paymentAccountNumber: string | null
    paymentAccountHolder: string | null
    paymentQrisUrl: string | null
    partnershipStatus: string | null
    rejectionReason: string | null
    avgRating: number | null
    totalReviews: number | null
    lastSyncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerPropertyCountAggregateOutputType = {
    id: number
    kmPropertyId: number
    ownerName: number
    ownerPhone: number
    ownerWhatsapp: number
    name: number
    slug: number
    address: number
    city: number
    district: number
    latitude: number
    longitude: number
    description: number
    genderType: number
    generalFacilities: number
    photos: number
    termsAndRules: number
    requirementsSchema: number
    paymentBankName: number
    paymentAccountNumber: number
    paymentAccountHolder: number
    paymentQrisUrl: number
    partnershipStatus: number
    rejectionReason: number
    avgRating: number
    totalReviews: number
    lastSyncedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PartnerPropertyAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    avgRating?: true
    totalReviews?: true
  }

  export type PartnerPropertySumAggregateInputType = {
    latitude?: true
    longitude?: true
    avgRating?: true
    totalReviews?: true
  }

  export type PartnerPropertyMinAggregateInputType = {
    id?: true
    kmPropertyId?: true
    ownerName?: true
    ownerPhone?: true
    ownerWhatsapp?: true
    name?: true
    slug?: true
    address?: true
    city?: true
    district?: true
    latitude?: true
    longitude?: true
    description?: true
    genderType?: true
    generalFacilities?: true
    photos?: true
    termsAndRules?: true
    requirementsSchema?: true
    paymentBankName?: true
    paymentAccountNumber?: true
    paymentAccountHolder?: true
    paymentQrisUrl?: true
    partnershipStatus?: true
    rejectionReason?: true
    avgRating?: true
    totalReviews?: true
    lastSyncedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerPropertyMaxAggregateInputType = {
    id?: true
    kmPropertyId?: true
    ownerName?: true
    ownerPhone?: true
    ownerWhatsapp?: true
    name?: true
    slug?: true
    address?: true
    city?: true
    district?: true
    latitude?: true
    longitude?: true
    description?: true
    genderType?: true
    generalFacilities?: true
    photos?: true
    termsAndRules?: true
    requirementsSchema?: true
    paymentBankName?: true
    paymentAccountNumber?: true
    paymentAccountHolder?: true
    paymentQrisUrl?: true
    partnershipStatus?: true
    rejectionReason?: true
    avgRating?: true
    totalReviews?: true
    lastSyncedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerPropertyCountAggregateInputType = {
    id?: true
    kmPropertyId?: true
    ownerName?: true
    ownerPhone?: true
    ownerWhatsapp?: true
    name?: true
    slug?: true
    address?: true
    city?: true
    district?: true
    latitude?: true
    longitude?: true
    description?: true
    genderType?: true
    generalFacilities?: true
    photos?: true
    termsAndRules?: true
    requirementsSchema?: true
    paymentBankName?: true
    paymentAccountNumber?: true
    paymentAccountHolder?: true
    paymentQrisUrl?: true
    partnershipStatus?: true
    rejectionReason?: true
    avgRating?: true
    totalReviews?: true
    lastSyncedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PartnerPropertyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PartnerProperty to aggregate.
     */
    where?: PartnerPropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartnerProperties to fetch.
     */
    orderBy?: PartnerPropertyOrderByWithRelationInput | PartnerPropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartnerPropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartnerProperties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartnerProperties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PartnerProperties
    **/
    _count?: true | PartnerPropertyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartnerPropertyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartnerPropertySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartnerPropertyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartnerPropertyMaxAggregateInputType
  }

  export type GetPartnerPropertyAggregateType<T extends PartnerPropertyAggregateArgs> = {
        [P in keyof T & keyof AggregatePartnerProperty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePartnerProperty[P]>
      : GetScalarType<T[P], AggregatePartnerProperty[P]>
  }




  export type PartnerPropertyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartnerPropertyWhereInput
    orderBy?: PartnerPropertyOrderByWithAggregationInput | PartnerPropertyOrderByWithAggregationInput[]
    by: PartnerPropertyScalarFieldEnum[] | PartnerPropertyScalarFieldEnum
    having?: PartnerPropertyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartnerPropertyCountAggregateInputType | true
    _avg?: PartnerPropertyAvgAggregateInputType
    _sum?: PartnerPropertySumAggregateInputType
    _min?: PartnerPropertyMinAggregateInputType
    _max?: PartnerPropertyMaxAggregateInputType
  }

  export type PartnerPropertyGroupByOutputType = {
    id: string
    kmPropertyId: string
    ownerName: string
    ownerPhone: string
    ownerWhatsapp: string
    name: string
    slug: string
    address: string
    city: string
    district: string
    latitude: number | null
    longitude: number | null
    description: string | null
    genderType: string
    generalFacilities: string
    photos: string
    termsAndRules: string | null
    requirementsSchema: string
    paymentBankName: string
    paymentAccountNumber: string
    paymentAccountHolder: string
    paymentQrisUrl: string | null
    partnershipStatus: string
    rejectionReason: string | null
    avgRating: number
    totalReviews: number
    lastSyncedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PartnerPropertyCountAggregateOutputType | null
    _avg: PartnerPropertyAvgAggregateOutputType | null
    _sum: PartnerPropertySumAggregateOutputType | null
    _min: PartnerPropertyMinAggregateOutputType | null
    _max: PartnerPropertyMaxAggregateOutputType | null
  }

  type GetPartnerPropertyGroupByPayload<T extends PartnerPropertyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartnerPropertyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartnerPropertyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartnerPropertyGroupByOutputType[P]>
            : GetScalarType<T[P], PartnerPropertyGroupByOutputType[P]>
        }
      >
    >


  export type PartnerPropertySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kmPropertyId?: boolean
    ownerName?: boolean
    ownerPhone?: boolean
    ownerWhatsapp?: boolean
    name?: boolean
    slug?: boolean
    address?: boolean
    city?: boolean
    district?: boolean
    latitude?: boolean
    longitude?: boolean
    description?: boolean
    genderType?: boolean
    generalFacilities?: boolean
    photos?: boolean
    termsAndRules?: boolean
    requirementsSchema?: boolean
    paymentBankName?: boolean
    paymentAccountNumber?: boolean
    paymentAccountHolder?: boolean
    paymentQrisUrl?: boolean
    partnershipStatus?: boolean
    rejectionReason?: boolean
    avgRating?: boolean
    totalReviews?: boolean
    lastSyncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rooms?: boolean | PartnerProperty$roomsArgs<ExtArgs>
    bookings?: boolean | PartnerProperty$bookingsArgs<ExtArgs>
    reviews?: boolean | PartnerProperty$reviewsArgs<ExtArgs>
    _count?: boolean | PartnerPropertyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["partnerProperty"]>

  export type PartnerPropertySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kmPropertyId?: boolean
    ownerName?: boolean
    ownerPhone?: boolean
    ownerWhatsapp?: boolean
    name?: boolean
    slug?: boolean
    address?: boolean
    city?: boolean
    district?: boolean
    latitude?: boolean
    longitude?: boolean
    description?: boolean
    genderType?: boolean
    generalFacilities?: boolean
    photos?: boolean
    termsAndRules?: boolean
    requirementsSchema?: boolean
    paymentBankName?: boolean
    paymentAccountNumber?: boolean
    paymentAccountHolder?: boolean
    paymentQrisUrl?: boolean
    partnershipStatus?: boolean
    rejectionReason?: boolean
    avgRating?: boolean
    totalReviews?: boolean
    lastSyncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["partnerProperty"]>

  export type PartnerPropertySelectScalar = {
    id?: boolean
    kmPropertyId?: boolean
    ownerName?: boolean
    ownerPhone?: boolean
    ownerWhatsapp?: boolean
    name?: boolean
    slug?: boolean
    address?: boolean
    city?: boolean
    district?: boolean
    latitude?: boolean
    longitude?: boolean
    description?: boolean
    genderType?: boolean
    generalFacilities?: boolean
    photos?: boolean
    termsAndRules?: boolean
    requirementsSchema?: boolean
    paymentBankName?: boolean
    paymentAccountNumber?: boolean
    paymentAccountHolder?: boolean
    paymentQrisUrl?: boolean
    partnershipStatus?: boolean
    rejectionReason?: boolean
    avgRating?: boolean
    totalReviews?: boolean
    lastSyncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PartnerPropertyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rooms?: boolean | PartnerProperty$roomsArgs<ExtArgs>
    bookings?: boolean | PartnerProperty$bookingsArgs<ExtArgs>
    reviews?: boolean | PartnerProperty$reviewsArgs<ExtArgs>
    _count?: boolean | PartnerPropertyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PartnerPropertyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PartnerPropertyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PartnerProperty"
    objects: {
      rooms: Prisma.$PartnerRoomPayload<ExtArgs>[]
      bookings: Prisma.$BookingPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      kmPropertyId: string
      ownerName: string
      ownerPhone: string
      ownerWhatsapp: string
      name: string
      slug: string
      address: string
      city: string
      district: string
      latitude: number | null
      longitude: number | null
      description: string | null
      genderType: string
      generalFacilities: string
      photos: string
      termsAndRules: string | null
      requirementsSchema: string
      paymentBankName: string
      paymentAccountNumber: string
      paymentAccountHolder: string
      paymentQrisUrl: string | null
      partnershipStatus: string
      rejectionReason: string | null
      avgRating: number
      totalReviews: number
      lastSyncedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["partnerProperty"]>
    composites: {}
  }

  type PartnerPropertyGetPayload<S extends boolean | null | undefined | PartnerPropertyDefaultArgs> = $Result.GetResult<Prisma.$PartnerPropertyPayload, S>

  type PartnerPropertyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PartnerPropertyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PartnerPropertyCountAggregateInputType | true
    }

  export interface PartnerPropertyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PartnerProperty'], meta: { name: 'PartnerProperty' } }
    /**
     * Find zero or one PartnerProperty that matches the filter.
     * @param {PartnerPropertyFindUniqueArgs} args - Arguments to find a PartnerProperty
     * @example
     * // Get one PartnerProperty
     * const partnerProperty = await prisma.partnerProperty.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartnerPropertyFindUniqueArgs>(args: SelectSubset<T, PartnerPropertyFindUniqueArgs<ExtArgs>>): Prisma__PartnerPropertyClient<$Result.GetResult<Prisma.$PartnerPropertyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PartnerProperty that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PartnerPropertyFindUniqueOrThrowArgs} args - Arguments to find a PartnerProperty
     * @example
     * // Get one PartnerProperty
     * const partnerProperty = await prisma.partnerProperty.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartnerPropertyFindUniqueOrThrowArgs>(args: SelectSubset<T, PartnerPropertyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartnerPropertyClient<$Result.GetResult<Prisma.$PartnerPropertyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PartnerProperty that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerPropertyFindFirstArgs} args - Arguments to find a PartnerProperty
     * @example
     * // Get one PartnerProperty
     * const partnerProperty = await prisma.partnerProperty.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartnerPropertyFindFirstArgs>(args?: SelectSubset<T, PartnerPropertyFindFirstArgs<ExtArgs>>): Prisma__PartnerPropertyClient<$Result.GetResult<Prisma.$PartnerPropertyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PartnerProperty that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerPropertyFindFirstOrThrowArgs} args - Arguments to find a PartnerProperty
     * @example
     * // Get one PartnerProperty
     * const partnerProperty = await prisma.partnerProperty.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartnerPropertyFindFirstOrThrowArgs>(args?: SelectSubset<T, PartnerPropertyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartnerPropertyClient<$Result.GetResult<Prisma.$PartnerPropertyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PartnerProperties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerPropertyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PartnerProperties
     * const partnerProperties = await prisma.partnerProperty.findMany()
     * 
     * // Get first 10 PartnerProperties
     * const partnerProperties = await prisma.partnerProperty.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partnerPropertyWithIdOnly = await prisma.partnerProperty.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartnerPropertyFindManyArgs>(args?: SelectSubset<T, PartnerPropertyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPropertyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PartnerProperty.
     * @param {PartnerPropertyCreateArgs} args - Arguments to create a PartnerProperty.
     * @example
     * // Create one PartnerProperty
     * const PartnerProperty = await prisma.partnerProperty.create({
     *   data: {
     *     // ... data to create a PartnerProperty
     *   }
     * })
     * 
     */
    create<T extends PartnerPropertyCreateArgs>(args: SelectSubset<T, PartnerPropertyCreateArgs<ExtArgs>>): Prisma__PartnerPropertyClient<$Result.GetResult<Prisma.$PartnerPropertyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PartnerProperties.
     * @param {PartnerPropertyCreateManyArgs} args - Arguments to create many PartnerProperties.
     * @example
     * // Create many PartnerProperties
     * const partnerProperty = await prisma.partnerProperty.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartnerPropertyCreateManyArgs>(args?: SelectSubset<T, PartnerPropertyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PartnerProperties and returns the data saved in the database.
     * @param {PartnerPropertyCreateManyAndReturnArgs} args - Arguments to create many PartnerProperties.
     * @example
     * // Create many PartnerProperties
     * const partnerProperty = await prisma.partnerProperty.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PartnerProperties and only return the `id`
     * const partnerPropertyWithIdOnly = await prisma.partnerProperty.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PartnerPropertyCreateManyAndReturnArgs>(args?: SelectSubset<T, PartnerPropertyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPropertyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PartnerProperty.
     * @param {PartnerPropertyDeleteArgs} args - Arguments to delete one PartnerProperty.
     * @example
     * // Delete one PartnerProperty
     * const PartnerProperty = await prisma.partnerProperty.delete({
     *   where: {
     *     // ... filter to delete one PartnerProperty
     *   }
     * })
     * 
     */
    delete<T extends PartnerPropertyDeleteArgs>(args: SelectSubset<T, PartnerPropertyDeleteArgs<ExtArgs>>): Prisma__PartnerPropertyClient<$Result.GetResult<Prisma.$PartnerPropertyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PartnerProperty.
     * @param {PartnerPropertyUpdateArgs} args - Arguments to update one PartnerProperty.
     * @example
     * // Update one PartnerProperty
     * const partnerProperty = await prisma.partnerProperty.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartnerPropertyUpdateArgs>(args: SelectSubset<T, PartnerPropertyUpdateArgs<ExtArgs>>): Prisma__PartnerPropertyClient<$Result.GetResult<Prisma.$PartnerPropertyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PartnerProperties.
     * @param {PartnerPropertyDeleteManyArgs} args - Arguments to filter PartnerProperties to delete.
     * @example
     * // Delete a few PartnerProperties
     * const { count } = await prisma.partnerProperty.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartnerPropertyDeleteManyArgs>(args?: SelectSubset<T, PartnerPropertyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PartnerProperties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerPropertyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PartnerProperties
     * const partnerProperty = await prisma.partnerProperty.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartnerPropertyUpdateManyArgs>(args: SelectSubset<T, PartnerPropertyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PartnerProperty.
     * @param {PartnerPropertyUpsertArgs} args - Arguments to update or create a PartnerProperty.
     * @example
     * // Update or create a PartnerProperty
     * const partnerProperty = await prisma.partnerProperty.upsert({
     *   create: {
     *     // ... data to create a PartnerProperty
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PartnerProperty we want to update
     *   }
     * })
     */
    upsert<T extends PartnerPropertyUpsertArgs>(args: SelectSubset<T, PartnerPropertyUpsertArgs<ExtArgs>>): Prisma__PartnerPropertyClient<$Result.GetResult<Prisma.$PartnerPropertyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PartnerProperties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerPropertyCountArgs} args - Arguments to filter PartnerProperties to count.
     * @example
     * // Count the number of PartnerProperties
     * const count = await prisma.partnerProperty.count({
     *   where: {
     *     // ... the filter for the PartnerProperties we want to count
     *   }
     * })
    **/
    count<T extends PartnerPropertyCountArgs>(
      args?: Subset<T, PartnerPropertyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartnerPropertyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PartnerProperty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerPropertyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PartnerPropertyAggregateArgs>(args: Subset<T, PartnerPropertyAggregateArgs>): Prisma.PrismaPromise<GetPartnerPropertyAggregateType<T>>

    /**
     * Group by PartnerProperty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerPropertyGroupByArgs} args - Group by arguments.
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
      T extends PartnerPropertyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartnerPropertyGroupByArgs['orderBy'] }
        : { orderBy?: PartnerPropertyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PartnerPropertyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartnerPropertyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PartnerProperty model
   */
  readonly fields: PartnerPropertyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PartnerProperty.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartnerPropertyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rooms<T extends PartnerProperty$roomsArgs<ExtArgs> = {}>(args?: Subset<T, PartnerProperty$roomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerRoomPayload<ExtArgs>, T, "findMany"> | Null>
    bookings<T extends PartnerProperty$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, PartnerProperty$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany"> | Null>
    reviews<T extends PartnerProperty$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, PartnerProperty$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the PartnerProperty model
   */ 
  interface PartnerPropertyFieldRefs {
    readonly id: FieldRef<"PartnerProperty", 'String'>
    readonly kmPropertyId: FieldRef<"PartnerProperty", 'String'>
    readonly ownerName: FieldRef<"PartnerProperty", 'String'>
    readonly ownerPhone: FieldRef<"PartnerProperty", 'String'>
    readonly ownerWhatsapp: FieldRef<"PartnerProperty", 'String'>
    readonly name: FieldRef<"PartnerProperty", 'String'>
    readonly slug: FieldRef<"PartnerProperty", 'String'>
    readonly address: FieldRef<"PartnerProperty", 'String'>
    readonly city: FieldRef<"PartnerProperty", 'String'>
    readonly district: FieldRef<"PartnerProperty", 'String'>
    readonly latitude: FieldRef<"PartnerProperty", 'Float'>
    readonly longitude: FieldRef<"PartnerProperty", 'Float'>
    readonly description: FieldRef<"PartnerProperty", 'String'>
    readonly genderType: FieldRef<"PartnerProperty", 'String'>
    readonly generalFacilities: FieldRef<"PartnerProperty", 'String'>
    readonly photos: FieldRef<"PartnerProperty", 'String'>
    readonly termsAndRules: FieldRef<"PartnerProperty", 'String'>
    readonly requirementsSchema: FieldRef<"PartnerProperty", 'String'>
    readonly paymentBankName: FieldRef<"PartnerProperty", 'String'>
    readonly paymentAccountNumber: FieldRef<"PartnerProperty", 'String'>
    readonly paymentAccountHolder: FieldRef<"PartnerProperty", 'String'>
    readonly paymentQrisUrl: FieldRef<"PartnerProperty", 'String'>
    readonly partnershipStatus: FieldRef<"PartnerProperty", 'String'>
    readonly rejectionReason: FieldRef<"PartnerProperty", 'String'>
    readonly avgRating: FieldRef<"PartnerProperty", 'Float'>
    readonly totalReviews: FieldRef<"PartnerProperty", 'Int'>
    readonly lastSyncedAt: FieldRef<"PartnerProperty", 'DateTime'>
    readonly createdAt: FieldRef<"PartnerProperty", 'DateTime'>
    readonly updatedAt: FieldRef<"PartnerProperty", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PartnerProperty findUnique
   */
  export type PartnerPropertyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerProperty
     */
    select?: PartnerPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerPropertyInclude<ExtArgs> | null
    /**
     * Filter, which PartnerProperty to fetch.
     */
    where: PartnerPropertyWhereUniqueInput
  }

  /**
   * PartnerProperty findUniqueOrThrow
   */
  export type PartnerPropertyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerProperty
     */
    select?: PartnerPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerPropertyInclude<ExtArgs> | null
    /**
     * Filter, which PartnerProperty to fetch.
     */
    where: PartnerPropertyWhereUniqueInput
  }

  /**
   * PartnerProperty findFirst
   */
  export type PartnerPropertyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerProperty
     */
    select?: PartnerPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerPropertyInclude<ExtArgs> | null
    /**
     * Filter, which PartnerProperty to fetch.
     */
    where?: PartnerPropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartnerProperties to fetch.
     */
    orderBy?: PartnerPropertyOrderByWithRelationInput | PartnerPropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PartnerProperties.
     */
    cursor?: PartnerPropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartnerProperties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartnerProperties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PartnerProperties.
     */
    distinct?: PartnerPropertyScalarFieldEnum | PartnerPropertyScalarFieldEnum[]
  }

  /**
   * PartnerProperty findFirstOrThrow
   */
  export type PartnerPropertyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerProperty
     */
    select?: PartnerPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerPropertyInclude<ExtArgs> | null
    /**
     * Filter, which PartnerProperty to fetch.
     */
    where?: PartnerPropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartnerProperties to fetch.
     */
    orderBy?: PartnerPropertyOrderByWithRelationInput | PartnerPropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PartnerProperties.
     */
    cursor?: PartnerPropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartnerProperties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartnerProperties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PartnerProperties.
     */
    distinct?: PartnerPropertyScalarFieldEnum | PartnerPropertyScalarFieldEnum[]
  }

  /**
   * PartnerProperty findMany
   */
  export type PartnerPropertyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerProperty
     */
    select?: PartnerPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerPropertyInclude<ExtArgs> | null
    /**
     * Filter, which PartnerProperties to fetch.
     */
    where?: PartnerPropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartnerProperties to fetch.
     */
    orderBy?: PartnerPropertyOrderByWithRelationInput | PartnerPropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PartnerProperties.
     */
    cursor?: PartnerPropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartnerProperties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartnerProperties.
     */
    skip?: number
    distinct?: PartnerPropertyScalarFieldEnum | PartnerPropertyScalarFieldEnum[]
  }

  /**
   * PartnerProperty create
   */
  export type PartnerPropertyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerProperty
     */
    select?: PartnerPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerPropertyInclude<ExtArgs> | null
    /**
     * The data needed to create a PartnerProperty.
     */
    data: XOR<PartnerPropertyCreateInput, PartnerPropertyUncheckedCreateInput>
  }

  /**
   * PartnerProperty createMany
   */
  export type PartnerPropertyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PartnerProperties.
     */
    data: PartnerPropertyCreateManyInput | PartnerPropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PartnerProperty createManyAndReturn
   */
  export type PartnerPropertyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerProperty
     */
    select?: PartnerPropertySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PartnerProperties.
     */
    data: PartnerPropertyCreateManyInput | PartnerPropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PartnerProperty update
   */
  export type PartnerPropertyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerProperty
     */
    select?: PartnerPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerPropertyInclude<ExtArgs> | null
    /**
     * The data needed to update a PartnerProperty.
     */
    data: XOR<PartnerPropertyUpdateInput, PartnerPropertyUncheckedUpdateInput>
    /**
     * Choose, which PartnerProperty to update.
     */
    where: PartnerPropertyWhereUniqueInput
  }

  /**
   * PartnerProperty updateMany
   */
  export type PartnerPropertyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PartnerProperties.
     */
    data: XOR<PartnerPropertyUpdateManyMutationInput, PartnerPropertyUncheckedUpdateManyInput>
    /**
     * Filter which PartnerProperties to update
     */
    where?: PartnerPropertyWhereInput
  }

  /**
   * PartnerProperty upsert
   */
  export type PartnerPropertyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerProperty
     */
    select?: PartnerPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerPropertyInclude<ExtArgs> | null
    /**
     * The filter to search for the PartnerProperty to update in case it exists.
     */
    where: PartnerPropertyWhereUniqueInput
    /**
     * In case the PartnerProperty found by the `where` argument doesn't exist, create a new PartnerProperty with this data.
     */
    create: XOR<PartnerPropertyCreateInput, PartnerPropertyUncheckedCreateInput>
    /**
     * In case the PartnerProperty was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartnerPropertyUpdateInput, PartnerPropertyUncheckedUpdateInput>
  }

  /**
   * PartnerProperty delete
   */
  export type PartnerPropertyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerProperty
     */
    select?: PartnerPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerPropertyInclude<ExtArgs> | null
    /**
     * Filter which PartnerProperty to delete.
     */
    where: PartnerPropertyWhereUniqueInput
  }

  /**
   * PartnerProperty deleteMany
   */
  export type PartnerPropertyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PartnerProperties to delete
     */
    where?: PartnerPropertyWhereInput
  }

  /**
   * PartnerProperty.rooms
   */
  export type PartnerProperty$roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerRoom
     */
    select?: PartnerRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerRoomInclude<ExtArgs> | null
    where?: PartnerRoomWhereInput
    orderBy?: PartnerRoomOrderByWithRelationInput | PartnerRoomOrderByWithRelationInput[]
    cursor?: PartnerRoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PartnerRoomScalarFieldEnum | PartnerRoomScalarFieldEnum[]
  }

  /**
   * PartnerProperty.bookings
   */
  export type PartnerProperty$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * PartnerProperty.reviews
   */
  export type PartnerProperty$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * PartnerProperty without action
   */
  export type PartnerPropertyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerProperty
     */
    select?: PartnerPropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerPropertyInclude<ExtArgs> | null
  }


  /**
   * Model PartnerRoom
   */

  export type AggregatePartnerRoom = {
    _count: PartnerRoomCountAggregateOutputType | null
    _avg: PartnerRoomAvgAggregateOutputType | null
    _sum: PartnerRoomSumAggregateOutputType | null
    _min: PartnerRoomMinAggregateOutputType | null
    _max: PartnerRoomMaxAggregateOutputType | null
  }

  export type PartnerRoomAvgAggregateOutputType = {
    sizeSqm: number | null
    monthlyPrice: number | null
    totalCapacity: number | null
    occupiedSlots: number | null
    reservedSlots: number | null
  }

  export type PartnerRoomSumAggregateOutputType = {
    sizeSqm: number | null
    monthlyPrice: number | null
    totalCapacity: number | null
    occupiedSlots: number | null
    reservedSlots: number | null
  }

  export type PartnerRoomMinAggregateOutputType = {
    id: string | null
    kmRoomId: string | null
    partnerPropertyId: string | null
    roomNumber: string | null
    roomType: string | null
    sizeSqm: number | null
    facilities: string | null
    photos: string | null
    monthlyPrice: number | null
    totalCapacity: number | null
    occupiedSlots: number | null
    reservedSlots: number | null
    status: string | null
    lastSyncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerRoomMaxAggregateOutputType = {
    id: string | null
    kmRoomId: string | null
    partnerPropertyId: string | null
    roomNumber: string | null
    roomType: string | null
    sizeSqm: number | null
    facilities: string | null
    photos: string | null
    monthlyPrice: number | null
    totalCapacity: number | null
    occupiedSlots: number | null
    reservedSlots: number | null
    status: string | null
    lastSyncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerRoomCountAggregateOutputType = {
    id: number
    kmRoomId: number
    partnerPropertyId: number
    roomNumber: number
    roomType: number
    sizeSqm: number
    facilities: number
    photos: number
    monthlyPrice: number
    totalCapacity: number
    occupiedSlots: number
    reservedSlots: number
    status: number
    lastSyncedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PartnerRoomAvgAggregateInputType = {
    sizeSqm?: true
    monthlyPrice?: true
    totalCapacity?: true
    occupiedSlots?: true
    reservedSlots?: true
  }

  export type PartnerRoomSumAggregateInputType = {
    sizeSqm?: true
    monthlyPrice?: true
    totalCapacity?: true
    occupiedSlots?: true
    reservedSlots?: true
  }

  export type PartnerRoomMinAggregateInputType = {
    id?: true
    kmRoomId?: true
    partnerPropertyId?: true
    roomNumber?: true
    roomType?: true
    sizeSqm?: true
    facilities?: true
    photos?: true
    monthlyPrice?: true
    totalCapacity?: true
    occupiedSlots?: true
    reservedSlots?: true
    status?: true
    lastSyncedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerRoomMaxAggregateInputType = {
    id?: true
    kmRoomId?: true
    partnerPropertyId?: true
    roomNumber?: true
    roomType?: true
    sizeSqm?: true
    facilities?: true
    photos?: true
    monthlyPrice?: true
    totalCapacity?: true
    occupiedSlots?: true
    reservedSlots?: true
    status?: true
    lastSyncedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerRoomCountAggregateInputType = {
    id?: true
    kmRoomId?: true
    partnerPropertyId?: true
    roomNumber?: true
    roomType?: true
    sizeSqm?: true
    facilities?: true
    photos?: true
    monthlyPrice?: true
    totalCapacity?: true
    occupiedSlots?: true
    reservedSlots?: true
    status?: true
    lastSyncedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PartnerRoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PartnerRoom to aggregate.
     */
    where?: PartnerRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartnerRooms to fetch.
     */
    orderBy?: PartnerRoomOrderByWithRelationInput | PartnerRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartnerRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartnerRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartnerRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PartnerRooms
    **/
    _count?: true | PartnerRoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartnerRoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartnerRoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartnerRoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartnerRoomMaxAggregateInputType
  }

  export type GetPartnerRoomAggregateType<T extends PartnerRoomAggregateArgs> = {
        [P in keyof T & keyof AggregatePartnerRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePartnerRoom[P]>
      : GetScalarType<T[P], AggregatePartnerRoom[P]>
  }




  export type PartnerRoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartnerRoomWhereInput
    orderBy?: PartnerRoomOrderByWithAggregationInput | PartnerRoomOrderByWithAggregationInput[]
    by: PartnerRoomScalarFieldEnum[] | PartnerRoomScalarFieldEnum
    having?: PartnerRoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartnerRoomCountAggregateInputType | true
    _avg?: PartnerRoomAvgAggregateInputType
    _sum?: PartnerRoomSumAggregateInputType
    _min?: PartnerRoomMinAggregateInputType
    _max?: PartnerRoomMaxAggregateInputType
  }

  export type PartnerRoomGroupByOutputType = {
    id: string
    kmRoomId: string
    partnerPropertyId: string
    roomNumber: string
    roomType: string
    sizeSqm: number | null
    facilities: string
    photos: string
    monthlyPrice: number
    totalCapacity: number
    occupiedSlots: number
    reservedSlots: number
    status: string
    lastSyncedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PartnerRoomCountAggregateOutputType | null
    _avg: PartnerRoomAvgAggregateOutputType | null
    _sum: PartnerRoomSumAggregateOutputType | null
    _min: PartnerRoomMinAggregateOutputType | null
    _max: PartnerRoomMaxAggregateOutputType | null
  }

  type GetPartnerRoomGroupByPayload<T extends PartnerRoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartnerRoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartnerRoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartnerRoomGroupByOutputType[P]>
            : GetScalarType<T[P], PartnerRoomGroupByOutputType[P]>
        }
      >
    >


  export type PartnerRoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kmRoomId?: boolean
    partnerPropertyId?: boolean
    roomNumber?: boolean
    roomType?: boolean
    sizeSqm?: boolean
    facilities?: boolean
    photos?: boolean
    monthlyPrice?: boolean
    totalCapacity?: boolean
    occupiedSlots?: boolean
    reservedSlots?: boolean
    status?: boolean
    lastSyncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    partnerProperty?: boolean | PartnerPropertyDefaultArgs<ExtArgs>
    bookings?: boolean | PartnerRoom$bookingsArgs<ExtArgs>
    _count?: boolean | PartnerRoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["partnerRoom"]>

  export type PartnerRoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kmRoomId?: boolean
    partnerPropertyId?: boolean
    roomNumber?: boolean
    roomType?: boolean
    sizeSqm?: boolean
    facilities?: boolean
    photos?: boolean
    monthlyPrice?: boolean
    totalCapacity?: boolean
    occupiedSlots?: boolean
    reservedSlots?: boolean
    status?: boolean
    lastSyncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    partnerProperty?: boolean | PartnerPropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["partnerRoom"]>

  export type PartnerRoomSelectScalar = {
    id?: boolean
    kmRoomId?: boolean
    partnerPropertyId?: boolean
    roomNumber?: boolean
    roomType?: boolean
    sizeSqm?: boolean
    facilities?: boolean
    photos?: boolean
    monthlyPrice?: boolean
    totalCapacity?: boolean
    occupiedSlots?: boolean
    reservedSlots?: boolean
    status?: boolean
    lastSyncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PartnerRoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    partnerProperty?: boolean | PartnerPropertyDefaultArgs<ExtArgs>
    bookings?: boolean | PartnerRoom$bookingsArgs<ExtArgs>
    _count?: boolean | PartnerRoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PartnerRoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    partnerProperty?: boolean | PartnerPropertyDefaultArgs<ExtArgs>
  }

  export type $PartnerRoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PartnerRoom"
    objects: {
      partnerProperty: Prisma.$PartnerPropertyPayload<ExtArgs>
      bookings: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      kmRoomId: string
      partnerPropertyId: string
      roomNumber: string
      roomType: string
      sizeSqm: number | null
      facilities: string
      photos: string
      monthlyPrice: number
      totalCapacity: number
      occupiedSlots: number
      reservedSlots: number
      status: string
      lastSyncedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["partnerRoom"]>
    composites: {}
  }

  type PartnerRoomGetPayload<S extends boolean | null | undefined | PartnerRoomDefaultArgs> = $Result.GetResult<Prisma.$PartnerRoomPayload, S>

  type PartnerRoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PartnerRoomFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PartnerRoomCountAggregateInputType | true
    }

  export interface PartnerRoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PartnerRoom'], meta: { name: 'PartnerRoom' } }
    /**
     * Find zero or one PartnerRoom that matches the filter.
     * @param {PartnerRoomFindUniqueArgs} args - Arguments to find a PartnerRoom
     * @example
     * // Get one PartnerRoom
     * const partnerRoom = await prisma.partnerRoom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartnerRoomFindUniqueArgs>(args: SelectSubset<T, PartnerRoomFindUniqueArgs<ExtArgs>>): Prisma__PartnerRoomClient<$Result.GetResult<Prisma.$PartnerRoomPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PartnerRoom that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PartnerRoomFindUniqueOrThrowArgs} args - Arguments to find a PartnerRoom
     * @example
     * // Get one PartnerRoom
     * const partnerRoom = await prisma.partnerRoom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartnerRoomFindUniqueOrThrowArgs>(args: SelectSubset<T, PartnerRoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartnerRoomClient<$Result.GetResult<Prisma.$PartnerRoomPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PartnerRoom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerRoomFindFirstArgs} args - Arguments to find a PartnerRoom
     * @example
     * // Get one PartnerRoom
     * const partnerRoom = await prisma.partnerRoom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartnerRoomFindFirstArgs>(args?: SelectSubset<T, PartnerRoomFindFirstArgs<ExtArgs>>): Prisma__PartnerRoomClient<$Result.GetResult<Prisma.$PartnerRoomPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PartnerRoom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerRoomFindFirstOrThrowArgs} args - Arguments to find a PartnerRoom
     * @example
     * // Get one PartnerRoom
     * const partnerRoom = await prisma.partnerRoom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartnerRoomFindFirstOrThrowArgs>(args?: SelectSubset<T, PartnerRoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartnerRoomClient<$Result.GetResult<Prisma.$PartnerRoomPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PartnerRooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerRoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PartnerRooms
     * const partnerRooms = await prisma.partnerRoom.findMany()
     * 
     * // Get first 10 PartnerRooms
     * const partnerRooms = await prisma.partnerRoom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partnerRoomWithIdOnly = await prisma.partnerRoom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartnerRoomFindManyArgs>(args?: SelectSubset<T, PartnerRoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerRoomPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PartnerRoom.
     * @param {PartnerRoomCreateArgs} args - Arguments to create a PartnerRoom.
     * @example
     * // Create one PartnerRoom
     * const PartnerRoom = await prisma.partnerRoom.create({
     *   data: {
     *     // ... data to create a PartnerRoom
     *   }
     * })
     * 
     */
    create<T extends PartnerRoomCreateArgs>(args: SelectSubset<T, PartnerRoomCreateArgs<ExtArgs>>): Prisma__PartnerRoomClient<$Result.GetResult<Prisma.$PartnerRoomPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PartnerRooms.
     * @param {PartnerRoomCreateManyArgs} args - Arguments to create many PartnerRooms.
     * @example
     * // Create many PartnerRooms
     * const partnerRoom = await prisma.partnerRoom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartnerRoomCreateManyArgs>(args?: SelectSubset<T, PartnerRoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PartnerRooms and returns the data saved in the database.
     * @param {PartnerRoomCreateManyAndReturnArgs} args - Arguments to create many PartnerRooms.
     * @example
     * // Create many PartnerRooms
     * const partnerRoom = await prisma.partnerRoom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PartnerRooms and only return the `id`
     * const partnerRoomWithIdOnly = await prisma.partnerRoom.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PartnerRoomCreateManyAndReturnArgs>(args?: SelectSubset<T, PartnerRoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerRoomPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PartnerRoom.
     * @param {PartnerRoomDeleteArgs} args - Arguments to delete one PartnerRoom.
     * @example
     * // Delete one PartnerRoom
     * const PartnerRoom = await prisma.partnerRoom.delete({
     *   where: {
     *     // ... filter to delete one PartnerRoom
     *   }
     * })
     * 
     */
    delete<T extends PartnerRoomDeleteArgs>(args: SelectSubset<T, PartnerRoomDeleteArgs<ExtArgs>>): Prisma__PartnerRoomClient<$Result.GetResult<Prisma.$PartnerRoomPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PartnerRoom.
     * @param {PartnerRoomUpdateArgs} args - Arguments to update one PartnerRoom.
     * @example
     * // Update one PartnerRoom
     * const partnerRoom = await prisma.partnerRoom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartnerRoomUpdateArgs>(args: SelectSubset<T, PartnerRoomUpdateArgs<ExtArgs>>): Prisma__PartnerRoomClient<$Result.GetResult<Prisma.$PartnerRoomPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PartnerRooms.
     * @param {PartnerRoomDeleteManyArgs} args - Arguments to filter PartnerRooms to delete.
     * @example
     * // Delete a few PartnerRooms
     * const { count } = await prisma.partnerRoom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartnerRoomDeleteManyArgs>(args?: SelectSubset<T, PartnerRoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PartnerRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerRoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PartnerRooms
     * const partnerRoom = await prisma.partnerRoom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartnerRoomUpdateManyArgs>(args: SelectSubset<T, PartnerRoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PartnerRoom.
     * @param {PartnerRoomUpsertArgs} args - Arguments to update or create a PartnerRoom.
     * @example
     * // Update or create a PartnerRoom
     * const partnerRoom = await prisma.partnerRoom.upsert({
     *   create: {
     *     // ... data to create a PartnerRoom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PartnerRoom we want to update
     *   }
     * })
     */
    upsert<T extends PartnerRoomUpsertArgs>(args: SelectSubset<T, PartnerRoomUpsertArgs<ExtArgs>>): Prisma__PartnerRoomClient<$Result.GetResult<Prisma.$PartnerRoomPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PartnerRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerRoomCountArgs} args - Arguments to filter PartnerRooms to count.
     * @example
     * // Count the number of PartnerRooms
     * const count = await prisma.partnerRoom.count({
     *   where: {
     *     // ... the filter for the PartnerRooms we want to count
     *   }
     * })
    **/
    count<T extends PartnerRoomCountArgs>(
      args?: Subset<T, PartnerRoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartnerRoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PartnerRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerRoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PartnerRoomAggregateArgs>(args: Subset<T, PartnerRoomAggregateArgs>): Prisma.PrismaPromise<GetPartnerRoomAggregateType<T>>

    /**
     * Group by PartnerRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerRoomGroupByArgs} args - Group by arguments.
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
      T extends PartnerRoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartnerRoomGroupByArgs['orderBy'] }
        : { orderBy?: PartnerRoomGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PartnerRoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartnerRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PartnerRoom model
   */
  readonly fields: PartnerRoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PartnerRoom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartnerRoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    partnerProperty<T extends PartnerPropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartnerPropertyDefaultArgs<ExtArgs>>): Prisma__PartnerPropertyClient<$Result.GetResult<Prisma.$PartnerPropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    bookings<T extends PartnerRoom$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, PartnerRoom$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the PartnerRoom model
   */ 
  interface PartnerRoomFieldRefs {
    readonly id: FieldRef<"PartnerRoom", 'String'>
    readonly kmRoomId: FieldRef<"PartnerRoom", 'String'>
    readonly partnerPropertyId: FieldRef<"PartnerRoom", 'String'>
    readonly roomNumber: FieldRef<"PartnerRoom", 'String'>
    readonly roomType: FieldRef<"PartnerRoom", 'String'>
    readonly sizeSqm: FieldRef<"PartnerRoom", 'Float'>
    readonly facilities: FieldRef<"PartnerRoom", 'String'>
    readonly photos: FieldRef<"PartnerRoom", 'String'>
    readonly monthlyPrice: FieldRef<"PartnerRoom", 'Float'>
    readonly totalCapacity: FieldRef<"PartnerRoom", 'Int'>
    readonly occupiedSlots: FieldRef<"PartnerRoom", 'Int'>
    readonly reservedSlots: FieldRef<"PartnerRoom", 'Int'>
    readonly status: FieldRef<"PartnerRoom", 'String'>
    readonly lastSyncedAt: FieldRef<"PartnerRoom", 'DateTime'>
    readonly createdAt: FieldRef<"PartnerRoom", 'DateTime'>
    readonly updatedAt: FieldRef<"PartnerRoom", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PartnerRoom findUnique
   */
  export type PartnerRoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerRoom
     */
    select?: PartnerRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerRoomInclude<ExtArgs> | null
    /**
     * Filter, which PartnerRoom to fetch.
     */
    where: PartnerRoomWhereUniqueInput
  }

  /**
   * PartnerRoom findUniqueOrThrow
   */
  export type PartnerRoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerRoom
     */
    select?: PartnerRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerRoomInclude<ExtArgs> | null
    /**
     * Filter, which PartnerRoom to fetch.
     */
    where: PartnerRoomWhereUniqueInput
  }

  /**
   * PartnerRoom findFirst
   */
  export type PartnerRoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerRoom
     */
    select?: PartnerRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerRoomInclude<ExtArgs> | null
    /**
     * Filter, which PartnerRoom to fetch.
     */
    where?: PartnerRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartnerRooms to fetch.
     */
    orderBy?: PartnerRoomOrderByWithRelationInput | PartnerRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PartnerRooms.
     */
    cursor?: PartnerRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartnerRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartnerRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PartnerRooms.
     */
    distinct?: PartnerRoomScalarFieldEnum | PartnerRoomScalarFieldEnum[]
  }

  /**
   * PartnerRoom findFirstOrThrow
   */
  export type PartnerRoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerRoom
     */
    select?: PartnerRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerRoomInclude<ExtArgs> | null
    /**
     * Filter, which PartnerRoom to fetch.
     */
    where?: PartnerRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartnerRooms to fetch.
     */
    orderBy?: PartnerRoomOrderByWithRelationInput | PartnerRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PartnerRooms.
     */
    cursor?: PartnerRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartnerRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartnerRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PartnerRooms.
     */
    distinct?: PartnerRoomScalarFieldEnum | PartnerRoomScalarFieldEnum[]
  }

  /**
   * PartnerRoom findMany
   */
  export type PartnerRoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerRoom
     */
    select?: PartnerRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerRoomInclude<ExtArgs> | null
    /**
     * Filter, which PartnerRooms to fetch.
     */
    where?: PartnerRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PartnerRooms to fetch.
     */
    orderBy?: PartnerRoomOrderByWithRelationInput | PartnerRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PartnerRooms.
     */
    cursor?: PartnerRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PartnerRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PartnerRooms.
     */
    skip?: number
    distinct?: PartnerRoomScalarFieldEnum | PartnerRoomScalarFieldEnum[]
  }

  /**
   * PartnerRoom create
   */
  export type PartnerRoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerRoom
     */
    select?: PartnerRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerRoomInclude<ExtArgs> | null
    /**
     * The data needed to create a PartnerRoom.
     */
    data: XOR<PartnerRoomCreateInput, PartnerRoomUncheckedCreateInput>
  }

  /**
   * PartnerRoom createMany
   */
  export type PartnerRoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PartnerRooms.
     */
    data: PartnerRoomCreateManyInput | PartnerRoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PartnerRoom createManyAndReturn
   */
  export type PartnerRoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerRoom
     */
    select?: PartnerRoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PartnerRooms.
     */
    data: PartnerRoomCreateManyInput | PartnerRoomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerRoomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PartnerRoom update
   */
  export type PartnerRoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerRoom
     */
    select?: PartnerRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerRoomInclude<ExtArgs> | null
    /**
     * The data needed to update a PartnerRoom.
     */
    data: XOR<PartnerRoomUpdateInput, PartnerRoomUncheckedUpdateInput>
    /**
     * Choose, which PartnerRoom to update.
     */
    where: PartnerRoomWhereUniqueInput
  }

  /**
   * PartnerRoom updateMany
   */
  export type PartnerRoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PartnerRooms.
     */
    data: XOR<PartnerRoomUpdateManyMutationInput, PartnerRoomUncheckedUpdateManyInput>
    /**
     * Filter which PartnerRooms to update
     */
    where?: PartnerRoomWhereInput
  }

  /**
   * PartnerRoom upsert
   */
  export type PartnerRoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerRoom
     */
    select?: PartnerRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerRoomInclude<ExtArgs> | null
    /**
     * The filter to search for the PartnerRoom to update in case it exists.
     */
    where: PartnerRoomWhereUniqueInput
    /**
     * In case the PartnerRoom found by the `where` argument doesn't exist, create a new PartnerRoom with this data.
     */
    create: XOR<PartnerRoomCreateInput, PartnerRoomUncheckedCreateInput>
    /**
     * In case the PartnerRoom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartnerRoomUpdateInput, PartnerRoomUncheckedUpdateInput>
  }

  /**
   * PartnerRoom delete
   */
  export type PartnerRoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerRoom
     */
    select?: PartnerRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerRoomInclude<ExtArgs> | null
    /**
     * Filter which PartnerRoom to delete.
     */
    where: PartnerRoomWhereUniqueInput
  }

  /**
   * PartnerRoom deleteMany
   */
  export type PartnerRoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PartnerRooms to delete
     */
    where?: PartnerRoomWhereInput
  }

  /**
   * PartnerRoom.bookings
   */
  export type PartnerRoom$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * PartnerRoom without action
   */
  export type PartnerRoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerRoom
     */
    select?: PartnerRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerRoomInclude<ExtArgs> | null
  }


  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingAvgAggregateOutputType = {
    slotsCount: number | null
    durationMonths: number | null
    pricePerSlot: number | null
    totalAmount: number | null
  }

  export type BookingSumAggregateOutputType = {
    slotsCount: number | null
    durationMonths: number | null
    pricePerSlot: number | null
    totalAmount: number | null
  }

  export type BookingMinAggregateOutputType = {
    id: string | null
    bookingCode: string | null
    customerId: string | null
    partnerPropertyId: string | null
    partnerRoomId: string | null
    slotsCount: number | null
    durationMonths: number | null
    startDate: Date | null
    endDate: Date | null
    pricePerSlot: number | null
    totalAmount: number | null
    occupantsData: string | null
    status: string | null
    cancellationReason: string | null
    paymentDeadline: Date | null
    verificationDeadline: Date | null
    checkInDeadline: Date | null
    isNeedsAttention: boolean | null
    idempotencyKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    bookingCode: string | null
    customerId: string | null
    partnerPropertyId: string | null
    partnerRoomId: string | null
    slotsCount: number | null
    durationMonths: number | null
    startDate: Date | null
    endDate: Date | null
    pricePerSlot: number | null
    totalAmount: number | null
    occupantsData: string | null
    status: string | null
    cancellationReason: string | null
    paymentDeadline: Date | null
    verificationDeadline: Date | null
    checkInDeadline: Date | null
    isNeedsAttention: boolean | null
    idempotencyKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    bookingCode: number
    customerId: number
    partnerPropertyId: number
    partnerRoomId: number
    slotsCount: number
    durationMonths: number
    startDate: number
    endDate: number
    pricePerSlot: number
    totalAmount: number
    occupantsData: number
    status: number
    cancellationReason: number
    paymentDeadline: number
    verificationDeadline: number
    checkInDeadline: number
    isNeedsAttention: number
    idempotencyKey: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookingAvgAggregateInputType = {
    slotsCount?: true
    durationMonths?: true
    pricePerSlot?: true
    totalAmount?: true
  }

  export type BookingSumAggregateInputType = {
    slotsCount?: true
    durationMonths?: true
    pricePerSlot?: true
    totalAmount?: true
  }

  export type BookingMinAggregateInputType = {
    id?: true
    bookingCode?: true
    customerId?: true
    partnerPropertyId?: true
    partnerRoomId?: true
    slotsCount?: true
    durationMonths?: true
    startDate?: true
    endDate?: true
    pricePerSlot?: true
    totalAmount?: true
    occupantsData?: true
    status?: true
    cancellationReason?: true
    paymentDeadline?: true
    verificationDeadline?: true
    checkInDeadline?: true
    isNeedsAttention?: true
    idempotencyKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    bookingCode?: true
    customerId?: true
    partnerPropertyId?: true
    partnerRoomId?: true
    slotsCount?: true
    durationMonths?: true
    startDate?: true
    endDate?: true
    pricePerSlot?: true
    totalAmount?: true
    occupantsData?: true
    status?: true
    cancellationReason?: true
    paymentDeadline?: true
    verificationDeadline?: true
    checkInDeadline?: true
    isNeedsAttention?: true
    idempotencyKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    bookingCode?: true
    customerId?: true
    partnerPropertyId?: true
    partnerRoomId?: true
    slotsCount?: true
    durationMonths?: true
    startDate?: true
    endDate?: true
    pricePerSlot?: true
    totalAmount?: true
    occupantsData?: true
    status?: true
    cancellationReason?: true
    paymentDeadline?: true
    verificationDeadline?: true
    checkInDeadline?: true
    isNeedsAttention?: true
    idempotencyKey?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _avg?: BookingAvgAggregateInputType
    _sum?: BookingSumAggregateInputType
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: string
    bookingCode: string
    customerId: string
    partnerPropertyId: string
    partnerRoomId: string
    slotsCount: number
    durationMonths: number
    startDate: Date
    endDate: Date
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status: string
    cancellationReason: string | null
    paymentDeadline: Date
    verificationDeadline: Date | null
    checkInDeadline: Date | null
    isNeedsAttention: boolean
    idempotencyKey: string
    createdAt: Date
    updatedAt: Date
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingCode?: boolean
    customerId?: boolean
    partnerPropertyId?: boolean
    partnerRoomId?: boolean
    slotsCount?: boolean
    durationMonths?: boolean
    startDate?: boolean
    endDate?: boolean
    pricePerSlot?: boolean
    totalAmount?: boolean
    occupantsData?: boolean
    status?: boolean
    cancellationReason?: boolean
    paymentDeadline?: boolean
    verificationDeadline?: boolean
    checkInDeadline?: boolean
    isNeedsAttention?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    partnerProperty?: boolean | PartnerPropertyDefaultArgs<ExtArgs>
    partnerRoom?: boolean | PartnerRoomDefaultArgs<ExtArgs>
    paymentSubmission?: boolean | Booking$paymentSubmissionArgs<ExtArgs>
    refundRequest?: boolean | Booking$refundRequestArgs<ExtArgs>
    review?: boolean | Booking$reviewArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingCode?: boolean
    customerId?: boolean
    partnerPropertyId?: boolean
    partnerRoomId?: boolean
    slotsCount?: boolean
    durationMonths?: boolean
    startDate?: boolean
    endDate?: boolean
    pricePerSlot?: boolean
    totalAmount?: boolean
    occupantsData?: boolean
    status?: boolean
    cancellationReason?: boolean
    paymentDeadline?: boolean
    verificationDeadline?: boolean
    checkInDeadline?: boolean
    isNeedsAttention?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    partnerProperty?: boolean | PartnerPropertyDefaultArgs<ExtArgs>
    partnerRoom?: boolean | PartnerRoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    bookingCode?: boolean
    customerId?: boolean
    partnerPropertyId?: boolean
    partnerRoomId?: boolean
    slotsCount?: boolean
    durationMonths?: boolean
    startDate?: boolean
    endDate?: boolean
    pricePerSlot?: boolean
    totalAmount?: boolean
    occupantsData?: boolean
    status?: boolean
    cancellationReason?: boolean
    paymentDeadline?: boolean
    verificationDeadline?: boolean
    checkInDeadline?: boolean
    isNeedsAttention?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    partnerProperty?: boolean | PartnerPropertyDefaultArgs<ExtArgs>
    partnerRoom?: boolean | PartnerRoomDefaultArgs<ExtArgs>
    paymentSubmission?: boolean | Booking$paymentSubmissionArgs<ExtArgs>
    refundRequest?: boolean | Booking$refundRequestArgs<ExtArgs>
    review?: boolean | Booking$reviewArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    partnerProperty?: boolean | PartnerPropertyDefaultArgs<ExtArgs>
    partnerRoom?: boolean | PartnerRoomDefaultArgs<ExtArgs>
  }

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      partnerProperty: Prisma.$PartnerPropertyPayload<ExtArgs>
      partnerRoom: Prisma.$PartnerRoomPayload<ExtArgs>
      paymentSubmission: Prisma.$PaymentSubmissionPayload<ExtArgs> | null
      refundRequest: Prisma.$RefundRequestPayload<ExtArgs> | null
      review: Prisma.$ReviewPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookingCode: string
      customerId: string
      partnerPropertyId: string
      partnerRoomId: string
      slotsCount: number
      durationMonths: number
      startDate: Date
      endDate: Date
      pricePerSlot: number
      totalAmount: number
      occupantsData: string
      status: string
      cancellationReason: string | null
      paymentDeadline: Date
      verificationDeadline: Date | null
      checkInDeadline: Date | null
      isNeedsAttention: boolean
      idempotencyKey: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
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
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    partnerProperty<T extends PartnerPropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartnerPropertyDefaultArgs<ExtArgs>>): Prisma__PartnerPropertyClient<$Result.GetResult<Prisma.$PartnerPropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    partnerRoom<T extends PartnerRoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartnerRoomDefaultArgs<ExtArgs>>): Prisma__PartnerRoomClient<$Result.GetResult<Prisma.$PartnerRoomPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    paymentSubmission<T extends Booking$paymentSubmissionArgs<ExtArgs> = {}>(args?: Subset<T, Booking$paymentSubmissionArgs<ExtArgs>>): Prisma__PaymentSubmissionClient<$Result.GetResult<Prisma.$PaymentSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    refundRequest<T extends Booking$refundRequestArgs<ExtArgs> = {}>(args?: Subset<T, Booking$refundRequestArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    review<T extends Booking$reviewArgs<ExtArgs> = {}>(args?: Subset<T, Booking$reviewArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the Booking model
   */ 
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'String'>
    readonly bookingCode: FieldRef<"Booking", 'String'>
    readonly customerId: FieldRef<"Booking", 'String'>
    readonly partnerPropertyId: FieldRef<"Booking", 'String'>
    readonly partnerRoomId: FieldRef<"Booking", 'String'>
    readonly slotsCount: FieldRef<"Booking", 'Int'>
    readonly durationMonths: FieldRef<"Booking", 'Int'>
    readonly startDate: FieldRef<"Booking", 'DateTime'>
    readonly endDate: FieldRef<"Booking", 'DateTime'>
    readonly pricePerSlot: FieldRef<"Booking", 'Float'>
    readonly totalAmount: FieldRef<"Booking", 'Float'>
    readonly occupantsData: FieldRef<"Booking", 'String'>
    readonly status: FieldRef<"Booking", 'String'>
    readonly cancellationReason: FieldRef<"Booking", 'String'>
    readonly paymentDeadline: FieldRef<"Booking", 'DateTime'>
    readonly verificationDeadline: FieldRef<"Booking", 'DateTime'>
    readonly checkInDeadline: FieldRef<"Booking", 'DateTime'>
    readonly isNeedsAttention: FieldRef<"Booking", 'Boolean'>
    readonly idempotencyKey: FieldRef<"Booking", 'String'>
    readonly createdAt: FieldRef<"Booking", 'DateTime'>
    readonly updatedAt: FieldRef<"Booking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking createManyAndReturn
   */
  export type BookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
  }

  /**
   * Booking.paymentSubmission
   */
  export type Booking$paymentSubmissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentSubmission
     */
    select?: PaymentSubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentSubmissionInclude<ExtArgs> | null
    where?: PaymentSubmissionWhereInput
  }

  /**
   * Booking.refundRequest
   */
  export type Booking$refundRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundRequestInclude<ExtArgs> | null
    where?: RefundRequestWhereInput
  }

  /**
   * Booking.review
   */
  export type Booking$reviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
  }


  /**
   * Model PaymentSubmission
   */

  export type AggregatePaymentSubmission = {
    _count: PaymentSubmissionCountAggregateOutputType | null
    _min: PaymentSubmissionMinAggregateOutputType | null
    _max: PaymentSubmissionMaxAggregateOutputType | null
  }

  export type PaymentSubmissionMinAggregateOutputType = {
    id: string | null
    bookingId: string | null
    transferReceiptUrl: string | null
    senderBankName: string | null
    senderAccountHolder: string | null
    submissionNotes: string | null
    submittedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentSubmissionMaxAggregateOutputType = {
    id: string | null
    bookingId: string | null
    transferReceiptUrl: string | null
    senderBankName: string | null
    senderAccountHolder: string | null
    submissionNotes: string | null
    submittedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentSubmissionCountAggregateOutputType = {
    id: number
    bookingId: number
    transferReceiptUrl: number
    senderBankName: number
    senderAccountHolder: number
    submissionNotes: number
    submittedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentSubmissionMinAggregateInputType = {
    id?: true
    bookingId?: true
    transferReceiptUrl?: true
    senderBankName?: true
    senderAccountHolder?: true
    submissionNotes?: true
    submittedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentSubmissionMaxAggregateInputType = {
    id?: true
    bookingId?: true
    transferReceiptUrl?: true
    senderBankName?: true
    senderAccountHolder?: true
    submissionNotes?: true
    submittedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentSubmissionCountAggregateInputType = {
    id?: true
    bookingId?: true
    transferReceiptUrl?: true
    senderBankName?: true
    senderAccountHolder?: true
    submissionNotes?: true
    submittedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentSubmission to aggregate.
     */
    where?: PaymentSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentSubmissions to fetch.
     */
    orderBy?: PaymentSubmissionOrderByWithRelationInput | PaymentSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentSubmissions
    **/
    _count?: true | PaymentSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentSubmissionMaxAggregateInputType
  }

  export type GetPaymentSubmissionAggregateType<T extends PaymentSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentSubmission[P]>
      : GetScalarType<T[P], AggregatePaymentSubmission[P]>
  }




  export type PaymentSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentSubmissionWhereInput
    orderBy?: PaymentSubmissionOrderByWithAggregationInput | PaymentSubmissionOrderByWithAggregationInput[]
    by: PaymentSubmissionScalarFieldEnum[] | PaymentSubmissionScalarFieldEnum
    having?: PaymentSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentSubmissionCountAggregateInputType | true
    _min?: PaymentSubmissionMinAggregateInputType
    _max?: PaymentSubmissionMaxAggregateInputType
  }

  export type PaymentSubmissionGroupByOutputType = {
    id: string
    bookingId: string
    transferReceiptUrl: string
    senderBankName: string | null
    senderAccountHolder: string | null
    submissionNotes: string | null
    submittedAt: Date
    createdAt: Date
    updatedAt: Date
    _count: PaymentSubmissionCountAggregateOutputType | null
    _min: PaymentSubmissionMinAggregateOutputType | null
    _max: PaymentSubmissionMaxAggregateOutputType | null
  }

  type GetPaymentSubmissionGroupByPayload<T extends PaymentSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    transferReceiptUrl?: boolean
    senderBankName?: boolean
    senderAccountHolder?: boolean
    submissionNotes?: boolean
    submittedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentSubmission"]>

  export type PaymentSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    transferReceiptUrl?: boolean
    senderBankName?: boolean
    senderAccountHolder?: boolean
    submissionNotes?: boolean
    submittedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentSubmission"]>

  export type PaymentSubmissionSelectScalar = {
    id?: boolean
    bookingId?: boolean
    transferReceiptUrl?: boolean
    senderBankName?: boolean
    senderAccountHolder?: boolean
    submissionNotes?: boolean
    submittedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentSubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type PaymentSubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }

  export type $PaymentSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentSubmission"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookingId: string
      transferReceiptUrl: string
      senderBankName: string | null
      senderAccountHolder: string | null
      submissionNotes: string | null
      submittedAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["paymentSubmission"]>
    composites: {}
  }

  type PaymentSubmissionGetPayload<S extends boolean | null | undefined | PaymentSubmissionDefaultArgs> = $Result.GetResult<Prisma.$PaymentSubmissionPayload, S>

  type PaymentSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PaymentSubmissionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PaymentSubmissionCountAggregateInputType | true
    }

  export interface PaymentSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentSubmission'], meta: { name: 'PaymentSubmission' } }
    /**
     * Find zero or one PaymentSubmission that matches the filter.
     * @param {PaymentSubmissionFindUniqueArgs} args - Arguments to find a PaymentSubmission
     * @example
     * // Get one PaymentSubmission
     * const paymentSubmission = await prisma.paymentSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentSubmissionFindUniqueArgs>(args: SelectSubset<T, PaymentSubmissionFindUniqueArgs<ExtArgs>>): Prisma__PaymentSubmissionClient<$Result.GetResult<Prisma.$PaymentSubmissionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PaymentSubmission that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PaymentSubmissionFindUniqueOrThrowArgs} args - Arguments to find a PaymentSubmission
     * @example
     * // Get one PaymentSubmission
     * const paymentSubmission = await prisma.paymentSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentSubmissionClient<$Result.GetResult<Prisma.$PaymentSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PaymentSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentSubmissionFindFirstArgs} args - Arguments to find a PaymentSubmission
     * @example
     * // Get one PaymentSubmission
     * const paymentSubmission = await prisma.paymentSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentSubmissionFindFirstArgs>(args?: SelectSubset<T, PaymentSubmissionFindFirstArgs<ExtArgs>>): Prisma__PaymentSubmissionClient<$Result.GetResult<Prisma.$PaymentSubmissionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PaymentSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentSubmissionFindFirstOrThrowArgs} args - Arguments to find a PaymentSubmission
     * @example
     * // Get one PaymentSubmission
     * const paymentSubmission = await prisma.paymentSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentSubmissionClient<$Result.GetResult<Prisma.$PaymentSubmissionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PaymentSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentSubmissions
     * const paymentSubmissions = await prisma.paymentSubmission.findMany()
     * 
     * // Get first 10 PaymentSubmissions
     * const paymentSubmissions = await prisma.paymentSubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentSubmissionWithIdOnly = await prisma.paymentSubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentSubmissionFindManyArgs>(args?: SelectSubset<T, PaymentSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentSubmissionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PaymentSubmission.
     * @param {PaymentSubmissionCreateArgs} args - Arguments to create a PaymentSubmission.
     * @example
     * // Create one PaymentSubmission
     * const PaymentSubmission = await prisma.paymentSubmission.create({
     *   data: {
     *     // ... data to create a PaymentSubmission
     *   }
     * })
     * 
     */
    create<T extends PaymentSubmissionCreateArgs>(args: SelectSubset<T, PaymentSubmissionCreateArgs<ExtArgs>>): Prisma__PaymentSubmissionClient<$Result.GetResult<Prisma.$PaymentSubmissionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PaymentSubmissions.
     * @param {PaymentSubmissionCreateManyArgs} args - Arguments to create many PaymentSubmissions.
     * @example
     * // Create many PaymentSubmissions
     * const paymentSubmission = await prisma.paymentSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentSubmissionCreateManyArgs>(args?: SelectSubset<T, PaymentSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentSubmissions and returns the data saved in the database.
     * @param {PaymentSubmissionCreateManyAndReturnArgs} args - Arguments to create many PaymentSubmissions.
     * @example
     * // Create many PaymentSubmissions
     * const paymentSubmission = await prisma.paymentSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentSubmissions and only return the `id`
     * const paymentSubmissionWithIdOnly = await prisma.paymentSubmission.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentSubmissionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PaymentSubmission.
     * @param {PaymentSubmissionDeleteArgs} args - Arguments to delete one PaymentSubmission.
     * @example
     * // Delete one PaymentSubmission
     * const PaymentSubmission = await prisma.paymentSubmission.delete({
     *   where: {
     *     // ... filter to delete one PaymentSubmission
     *   }
     * })
     * 
     */
    delete<T extends PaymentSubmissionDeleteArgs>(args: SelectSubset<T, PaymentSubmissionDeleteArgs<ExtArgs>>): Prisma__PaymentSubmissionClient<$Result.GetResult<Prisma.$PaymentSubmissionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PaymentSubmission.
     * @param {PaymentSubmissionUpdateArgs} args - Arguments to update one PaymentSubmission.
     * @example
     * // Update one PaymentSubmission
     * const paymentSubmission = await prisma.paymentSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentSubmissionUpdateArgs>(args: SelectSubset<T, PaymentSubmissionUpdateArgs<ExtArgs>>): Prisma__PaymentSubmissionClient<$Result.GetResult<Prisma.$PaymentSubmissionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PaymentSubmissions.
     * @param {PaymentSubmissionDeleteManyArgs} args - Arguments to filter PaymentSubmissions to delete.
     * @example
     * // Delete a few PaymentSubmissions
     * const { count } = await prisma.paymentSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentSubmissionDeleteManyArgs>(args?: SelectSubset<T, PaymentSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentSubmissions
     * const paymentSubmission = await prisma.paymentSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentSubmissionUpdateManyArgs>(args: SelectSubset<T, PaymentSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PaymentSubmission.
     * @param {PaymentSubmissionUpsertArgs} args - Arguments to update or create a PaymentSubmission.
     * @example
     * // Update or create a PaymentSubmission
     * const paymentSubmission = await prisma.paymentSubmission.upsert({
     *   create: {
     *     // ... data to create a PaymentSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentSubmission we want to update
     *   }
     * })
     */
    upsert<T extends PaymentSubmissionUpsertArgs>(args: SelectSubset<T, PaymentSubmissionUpsertArgs<ExtArgs>>): Prisma__PaymentSubmissionClient<$Result.GetResult<Prisma.$PaymentSubmissionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PaymentSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentSubmissionCountArgs} args - Arguments to filter PaymentSubmissions to count.
     * @example
     * // Count the number of PaymentSubmissions
     * const count = await prisma.paymentSubmission.count({
     *   where: {
     *     // ... the filter for the PaymentSubmissions we want to count
     *   }
     * })
    **/
    count<T extends PaymentSubmissionCountArgs>(
      args?: Subset<T, PaymentSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PaymentSubmissionAggregateArgs>(args: Subset<T, PaymentSubmissionAggregateArgs>): Prisma.PrismaPromise<GetPaymentSubmissionAggregateType<T>>

    /**
     * Group by PaymentSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentSubmissionGroupByArgs} args - Group by arguments.
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
      T extends PaymentSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: PaymentSubmissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PaymentSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentSubmission model
   */
  readonly fields: PaymentSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the PaymentSubmission model
   */ 
  interface PaymentSubmissionFieldRefs {
    readonly id: FieldRef<"PaymentSubmission", 'String'>
    readonly bookingId: FieldRef<"PaymentSubmission", 'String'>
    readonly transferReceiptUrl: FieldRef<"PaymentSubmission", 'String'>
    readonly senderBankName: FieldRef<"PaymentSubmission", 'String'>
    readonly senderAccountHolder: FieldRef<"PaymentSubmission", 'String'>
    readonly submissionNotes: FieldRef<"PaymentSubmission", 'String'>
    readonly submittedAt: FieldRef<"PaymentSubmission", 'DateTime'>
    readonly createdAt: FieldRef<"PaymentSubmission", 'DateTime'>
    readonly updatedAt: FieldRef<"PaymentSubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PaymentSubmission findUnique
   */
  export type PaymentSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentSubmission
     */
    select?: PaymentSubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentSubmission to fetch.
     */
    where: PaymentSubmissionWhereUniqueInput
  }

  /**
   * PaymentSubmission findUniqueOrThrow
   */
  export type PaymentSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentSubmission
     */
    select?: PaymentSubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentSubmission to fetch.
     */
    where: PaymentSubmissionWhereUniqueInput
  }

  /**
   * PaymentSubmission findFirst
   */
  export type PaymentSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentSubmission
     */
    select?: PaymentSubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentSubmission to fetch.
     */
    where?: PaymentSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentSubmissions to fetch.
     */
    orderBy?: PaymentSubmissionOrderByWithRelationInput | PaymentSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentSubmissions.
     */
    cursor?: PaymentSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentSubmissions.
     */
    distinct?: PaymentSubmissionScalarFieldEnum | PaymentSubmissionScalarFieldEnum[]
  }

  /**
   * PaymentSubmission findFirstOrThrow
   */
  export type PaymentSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentSubmission
     */
    select?: PaymentSubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentSubmission to fetch.
     */
    where?: PaymentSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentSubmissions to fetch.
     */
    orderBy?: PaymentSubmissionOrderByWithRelationInput | PaymentSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentSubmissions.
     */
    cursor?: PaymentSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentSubmissions.
     */
    distinct?: PaymentSubmissionScalarFieldEnum | PaymentSubmissionScalarFieldEnum[]
  }

  /**
   * PaymentSubmission findMany
   */
  export type PaymentSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentSubmission
     */
    select?: PaymentSubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentSubmissions to fetch.
     */
    where?: PaymentSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentSubmissions to fetch.
     */
    orderBy?: PaymentSubmissionOrderByWithRelationInput | PaymentSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentSubmissions.
     */
    cursor?: PaymentSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentSubmissions.
     */
    skip?: number
    distinct?: PaymentSubmissionScalarFieldEnum | PaymentSubmissionScalarFieldEnum[]
  }

  /**
   * PaymentSubmission create
   */
  export type PaymentSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentSubmission
     */
    select?: PaymentSubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentSubmission.
     */
    data: XOR<PaymentSubmissionCreateInput, PaymentSubmissionUncheckedCreateInput>
  }

  /**
   * PaymentSubmission createMany
   */
  export type PaymentSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentSubmissions.
     */
    data: PaymentSubmissionCreateManyInput | PaymentSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentSubmission createManyAndReturn
   */
  export type PaymentSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentSubmission
     */
    select?: PaymentSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PaymentSubmissions.
     */
    data: PaymentSubmissionCreateManyInput | PaymentSubmissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentSubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentSubmission update
   */
  export type PaymentSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentSubmission
     */
    select?: PaymentSubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentSubmission.
     */
    data: XOR<PaymentSubmissionUpdateInput, PaymentSubmissionUncheckedUpdateInput>
    /**
     * Choose, which PaymentSubmission to update.
     */
    where: PaymentSubmissionWhereUniqueInput
  }

  /**
   * PaymentSubmission updateMany
   */
  export type PaymentSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentSubmissions.
     */
    data: XOR<PaymentSubmissionUpdateManyMutationInput, PaymentSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which PaymentSubmissions to update
     */
    where?: PaymentSubmissionWhereInput
  }

  /**
   * PaymentSubmission upsert
   */
  export type PaymentSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentSubmission
     */
    select?: PaymentSubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentSubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentSubmission to update in case it exists.
     */
    where: PaymentSubmissionWhereUniqueInput
    /**
     * In case the PaymentSubmission found by the `where` argument doesn't exist, create a new PaymentSubmission with this data.
     */
    create: XOR<PaymentSubmissionCreateInput, PaymentSubmissionUncheckedCreateInput>
    /**
     * In case the PaymentSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentSubmissionUpdateInput, PaymentSubmissionUncheckedUpdateInput>
  }

  /**
   * PaymentSubmission delete
   */
  export type PaymentSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentSubmission
     */
    select?: PaymentSubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentSubmissionInclude<ExtArgs> | null
    /**
     * Filter which PaymentSubmission to delete.
     */
    where: PaymentSubmissionWhereUniqueInput
  }

  /**
   * PaymentSubmission deleteMany
   */
  export type PaymentSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentSubmissions to delete
     */
    where?: PaymentSubmissionWhereInput
  }

  /**
   * PaymentSubmission without action
   */
  export type PaymentSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentSubmission
     */
    select?: PaymentSubmissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentSubmissionInclude<ExtArgs> | null
  }


  /**
   * Model RefundRequest
   */

  export type AggregateRefundRequest = {
    _count: RefundRequestCountAggregateOutputType | null
    _avg: RefundRequestAvgAggregateOutputType | null
    _sum: RefundRequestSumAggregateOutputType | null
    _min: RefundRequestMinAggregateOutputType | null
    _max: RefundRequestMaxAggregateOutputType | null
  }

  export type RefundRequestAvgAggregateOutputType = {
    refundAmount: number | null
    penaltyDeduction: number | null
  }

  export type RefundRequestSumAggregateOutputType = {
    refundAmount: number | null
    penaltyDeduction: number | null
  }

  export type RefundRequestMinAggregateOutputType = {
    id: string | null
    bookingId: string | null
    bankName: string | null
    accountNumber: string | null
    accountHolder: string | null
    refundAmount: number | null
    penaltyDeduction: number | null
    status: string | null
    requestedAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RefundRequestMaxAggregateOutputType = {
    id: string | null
    bookingId: string | null
    bankName: string | null
    accountNumber: string | null
    accountHolder: string | null
    refundAmount: number | null
    penaltyDeduction: number | null
    status: string | null
    requestedAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RefundRequestCountAggregateOutputType = {
    id: number
    bookingId: number
    bankName: number
    accountNumber: number
    accountHolder: number
    refundAmount: number
    penaltyDeduction: number
    status: number
    requestedAt: number
    completedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RefundRequestAvgAggregateInputType = {
    refundAmount?: true
    penaltyDeduction?: true
  }

  export type RefundRequestSumAggregateInputType = {
    refundAmount?: true
    penaltyDeduction?: true
  }

  export type RefundRequestMinAggregateInputType = {
    id?: true
    bookingId?: true
    bankName?: true
    accountNumber?: true
    accountHolder?: true
    refundAmount?: true
    penaltyDeduction?: true
    status?: true
    requestedAt?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RefundRequestMaxAggregateInputType = {
    id?: true
    bookingId?: true
    bankName?: true
    accountNumber?: true
    accountHolder?: true
    refundAmount?: true
    penaltyDeduction?: true
    status?: true
    requestedAt?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RefundRequestCountAggregateInputType = {
    id?: true
    bookingId?: true
    bankName?: true
    accountNumber?: true
    accountHolder?: true
    refundAmount?: true
    penaltyDeduction?: true
    status?: true
    requestedAt?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RefundRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefundRequest to aggregate.
     */
    where?: RefundRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefundRequests to fetch.
     */
    orderBy?: RefundRequestOrderByWithRelationInput | RefundRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefundRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefundRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefundRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefundRequests
    **/
    _count?: true | RefundRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RefundRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RefundRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefundRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefundRequestMaxAggregateInputType
  }

  export type GetRefundRequestAggregateType<T extends RefundRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateRefundRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefundRequest[P]>
      : GetScalarType<T[P], AggregateRefundRequest[P]>
  }




  export type RefundRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefundRequestWhereInput
    orderBy?: RefundRequestOrderByWithAggregationInput | RefundRequestOrderByWithAggregationInput[]
    by: RefundRequestScalarFieldEnum[] | RefundRequestScalarFieldEnum
    having?: RefundRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefundRequestCountAggregateInputType | true
    _avg?: RefundRequestAvgAggregateInputType
    _sum?: RefundRequestSumAggregateInputType
    _min?: RefundRequestMinAggregateInputType
    _max?: RefundRequestMaxAggregateInputType
  }

  export type RefundRequestGroupByOutputType = {
    id: string
    bookingId: string
    bankName: string
    accountNumber: string
    accountHolder: string
    refundAmount: number
    penaltyDeduction: number
    status: string
    requestedAt: Date
    completedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: RefundRequestCountAggregateOutputType | null
    _avg: RefundRequestAvgAggregateOutputType | null
    _sum: RefundRequestSumAggregateOutputType | null
    _min: RefundRequestMinAggregateOutputType | null
    _max: RefundRequestMaxAggregateOutputType | null
  }

  type GetRefundRequestGroupByPayload<T extends RefundRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefundRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefundRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefundRequestGroupByOutputType[P]>
            : GetScalarType<T[P], RefundRequestGroupByOutputType[P]>
        }
      >
    >


  export type RefundRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    bankName?: boolean
    accountNumber?: boolean
    accountHolder?: boolean
    refundAmount?: boolean
    penaltyDeduction?: boolean
    status?: boolean
    requestedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refundRequest"]>

  export type RefundRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    bankName?: boolean
    accountNumber?: boolean
    accountHolder?: boolean
    refundAmount?: boolean
    penaltyDeduction?: boolean
    status?: boolean
    requestedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refundRequest"]>

  export type RefundRequestSelectScalar = {
    id?: boolean
    bookingId?: boolean
    bankName?: boolean
    accountNumber?: boolean
    accountHolder?: boolean
    refundAmount?: boolean
    penaltyDeduction?: boolean
    status?: boolean
    requestedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RefundRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }
  export type RefundRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
  }

  export type $RefundRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefundRequest"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookingId: string
      bankName: string
      accountNumber: string
      accountHolder: string
      refundAmount: number
      penaltyDeduction: number
      status: string
      requestedAt: Date
      completedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["refundRequest"]>
    composites: {}
  }

  type RefundRequestGetPayload<S extends boolean | null | undefined | RefundRequestDefaultArgs> = $Result.GetResult<Prisma.$RefundRequestPayload, S>

  type RefundRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RefundRequestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RefundRequestCountAggregateInputType | true
    }

  export interface RefundRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefundRequest'], meta: { name: 'RefundRequest' } }
    /**
     * Find zero or one RefundRequest that matches the filter.
     * @param {RefundRequestFindUniqueArgs} args - Arguments to find a RefundRequest
     * @example
     * // Get one RefundRequest
     * const refundRequest = await prisma.refundRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefundRequestFindUniqueArgs>(args: SelectSubset<T, RefundRequestFindUniqueArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RefundRequest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RefundRequestFindUniqueOrThrowArgs} args - Arguments to find a RefundRequest
     * @example
     * // Get one RefundRequest
     * const refundRequest = await prisma.refundRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefundRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, RefundRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RefundRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestFindFirstArgs} args - Arguments to find a RefundRequest
     * @example
     * // Get one RefundRequest
     * const refundRequest = await prisma.refundRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefundRequestFindFirstArgs>(args?: SelectSubset<T, RefundRequestFindFirstArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RefundRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestFindFirstOrThrowArgs} args - Arguments to find a RefundRequest
     * @example
     * // Get one RefundRequest
     * const refundRequest = await prisma.refundRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefundRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, RefundRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RefundRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefundRequests
     * const refundRequests = await prisma.refundRequest.findMany()
     * 
     * // Get first 10 RefundRequests
     * const refundRequests = await prisma.refundRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refundRequestWithIdOnly = await prisma.refundRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefundRequestFindManyArgs>(args?: SelectSubset<T, RefundRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RefundRequest.
     * @param {RefundRequestCreateArgs} args - Arguments to create a RefundRequest.
     * @example
     * // Create one RefundRequest
     * const RefundRequest = await prisma.refundRequest.create({
     *   data: {
     *     // ... data to create a RefundRequest
     *   }
     * })
     * 
     */
    create<T extends RefundRequestCreateArgs>(args: SelectSubset<T, RefundRequestCreateArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RefundRequests.
     * @param {RefundRequestCreateManyArgs} args - Arguments to create many RefundRequests.
     * @example
     * // Create many RefundRequests
     * const refundRequest = await prisma.refundRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefundRequestCreateManyArgs>(args?: SelectSubset<T, RefundRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefundRequests and returns the data saved in the database.
     * @param {RefundRequestCreateManyAndReturnArgs} args - Arguments to create many RefundRequests.
     * @example
     * // Create many RefundRequests
     * const refundRequest = await prisma.refundRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefundRequests and only return the `id`
     * const refundRequestWithIdOnly = await prisma.refundRequest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefundRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, RefundRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RefundRequest.
     * @param {RefundRequestDeleteArgs} args - Arguments to delete one RefundRequest.
     * @example
     * // Delete one RefundRequest
     * const RefundRequest = await prisma.refundRequest.delete({
     *   where: {
     *     // ... filter to delete one RefundRequest
     *   }
     * })
     * 
     */
    delete<T extends RefundRequestDeleteArgs>(args: SelectSubset<T, RefundRequestDeleteArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RefundRequest.
     * @param {RefundRequestUpdateArgs} args - Arguments to update one RefundRequest.
     * @example
     * // Update one RefundRequest
     * const refundRequest = await prisma.refundRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefundRequestUpdateArgs>(args: SelectSubset<T, RefundRequestUpdateArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RefundRequests.
     * @param {RefundRequestDeleteManyArgs} args - Arguments to filter RefundRequests to delete.
     * @example
     * // Delete a few RefundRequests
     * const { count } = await prisma.refundRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefundRequestDeleteManyArgs>(args?: SelectSubset<T, RefundRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefundRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefundRequests
     * const refundRequest = await prisma.refundRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefundRequestUpdateManyArgs>(args: SelectSubset<T, RefundRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RefundRequest.
     * @param {RefundRequestUpsertArgs} args - Arguments to update or create a RefundRequest.
     * @example
     * // Update or create a RefundRequest
     * const refundRequest = await prisma.refundRequest.upsert({
     *   create: {
     *     // ... data to create a RefundRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefundRequest we want to update
     *   }
     * })
     */
    upsert<T extends RefundRequestUpsertArgs>(args: SelectSubset<T, RefundRequestUpsertArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RefundRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestCountArgs} args - Arguments to filter RefundRequests to count.
     * @example
     * // Count the number of RefundRequests
     * const count = await prisma.refundRequest.count({
     *   where: {
     *     // ... the filter for the RefundRequests we want to count
     *   }
     * })
    **/
    count<T extends RefundRequestCountArgs>(
      args?: Subset<T, RefundRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefundRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefundRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RefundRequestAggregateArgs>(args: Subset<T, RefundRequestAggregateArgs>): Prisma.PrismaPromise<GetRefundRequestAggregateType<T>>

    /**
     * Group by RefundRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestGroupByArgs} args - Group by arguments.
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
      T extends RefundRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefundRequestGroupByArgs['orderBy'] }
        : { orderBy?: RefundRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RefundRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefundRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefundRequest model
   */
  readonly fields: RefundRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefundRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefundRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the RefundRequest model
   */ 
  interface RefundRequestFieldRefs {
    readonly id: FieldRef<"RefundRequest", 'String'>
    readonly bookingId: FieldRef<"RefundRequest", 'String'>
    readonly bankName: FieldRef<"RefundRequest", 'String'>
    readonly accountNumber: FieldRef<"RefundRequest", 'String'>
    readonly accountHolder: FieldRef<"RefundRequest", 'String'>
    readonly refundAmount: FieldRef<"RefundRequest", 'Float'>
    readonly penaltyDeduction: FieldRef<"RefundRequest", 'Float'>
    readonly status: FieldRef<"RefundRequest", 'String'>
    readonly requestedAt: FieldRef<"RefundRequest", 'DateTime'>
    readonly completedAt: FieldRef<"RefundRequest", 'DateTime'>
    readonly createdAt: FieldRef<"RefundRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"RefundRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefundRequest findUnique
   */
  export type RefundRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundRequestInclude<ExtArgs> | null
    /**
     * Filter, which RefundRequest to fetch.
     */
    where: RefundRequestWhereUniqueInput
  }

  /**
   * RefundRequest findUniqueOrThrow
   */
  export type RefundRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundRequestInclude<ExtArgs> | null
    /**
     * Filter, which RefundRequest to fetch.
     */
    where: RefundRequestWhereUniqueInput
  }

  /**
   * RefundRequest findFirst
   */
  export type RefundRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundRequestInclude<ExtArgs> | null
    /**
     * Filter, which RefundRequest to fetch.
     */
    where?: RefundRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefundRequests to fetch.
     */
    orderBy?: RefundRequestOrderByWithRelationInput | RefundRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefundRequests.
     */
    cursor?: RefundRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefundRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefundRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefundRequests.
     */
    distinct?: RefundRequestScalarFieldEnum | RefundRequestScalarFieldEnum[]
  }

  /**
   * RefundRequest findFirstOrThrow
   */
  export type RefundRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundRequestInclude<ExtArgs> | null
    /**
     * Filter, which RefundRequest to fetch.
     */
    where?: RefundRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefundRequests to fetch.
     */
    orderBy?: RefundRequestOrderByWithRelationInput | RefundRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefundRequests.
     */
    cursor?: RefundRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefundRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefundRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefundRequests.
     */
    distinct?: RefundRequestScalarFieldEnum | RefundRequestScalarFieldEnum[]
  }

  /**
   * RefundRequest findMany
   */
  export type RefundRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundRequestInclude<ExtArgs> | null
    /**
     * Filter, which RefundRequests to fetch.
     */
    where?: RefundRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefundRequests to fetch.
     */
    orderBy?: RefundRequestOrderByWithRelationInput | RefundRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefundRequests.
     */
    cursor?: RefundRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefundRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefundRequests.
     */
    skip?: number
    distinct?: RefundRequestScalarFieldEnum | RefundRequestScalarFieldEnum[]
  }

  /**
   * RefundRequest create
   */
  export type RefundRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a RefundRequest.
     */
    data: XOR<RefundRequestCreateInput, RefundRequestUncheckedCreateInput>
  }

  /**
   * RefundRequest createMany
   */
  export type RefundRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefundRequests.
     */
    data: RefundRequestCreateManyInput | RefundRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefundRequest createManyAndReturn
   */
  export type RefundRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RefundRequests.
     */
    data: RefundRequestCreateManyInput | RefundRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefundRequest update
   */
  export type RefundRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a RefundRequest.
     */
    data: XOR<RefundRequestUpdateInput, RefundRequestUncheckedUpdateInput>
    /**
     * Choose, which RefundRequest to update.
     */
    where: RefundRequestWhereUniqueInput
  }

  /**
   * RefundRequest updateMany
   */
  export type RefundRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefundRequests.
     */
    data: XOR<RefundRequestUpdateManyMutationInput, RefundRequestUncheckedUpdateManyInput>
    /**
     * Filter which RefundRequests to update
     */
    where?: RefundRequestWhereInput
  }

  /**
   * RefundRequest upsert
   */
  export type RefundRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the RefundRequest to update in case it exists.
     */
    where: RefundRequestWhereUniqueInput
    /**
     * In case the RefundRequest found by the `where` argument doesn't exist, create a new RefundRequest with this data.
     */
    create: XOR<RefundRequestCreateInput, RefundRequestUncheckedCreateInput>
    /**
     * In case the RefundRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefundRequestUpdateInput, RefundRequestUncheckedUpdateInput>
  }

  /**
   * RefundRequest delete
   */
  export type RefundRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundRequestInclude<ExtArgs> | null
    /**
     * Filter which RefundRequest to delete.
     */
    where: RefundRequestWhereUniqueInput
  }

  /**
   * RefundRequest deleteMany
   */
  export type RefundRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefundRequests to delete
     */
    where?: RefundRequestWhereInput
  }

  /**
   * RefundRequest without action
   */
  export type RefundRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefundRequestInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    bookingId: string | null
    customerId: string | null
    partnerPropertyId: string | null
    rating: number | null
    reviewText: string | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    bookingId: string | null
    customerId: string | null
    partnerPropertyId: string | null
    rating: number | null
    reviewText: string | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    bookingId: number
    customerId: number
    partnerPropertyId: number
    rating: number
    reviewText: number
    isPublished: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    bookingId?: true
    customerId?: true
    partnerPropertyId?: true
    rating?: true
    reviewText?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    bookingId?: true
    customerId?: true
    partnerPropertyId?: true
    rating?: true
    reviewText?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    bookingId?: true
    customerId?: true
    partnerPropertyId?: true
    rating?: true
    reviewText?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    bookingId: string
    customerId: string
    partnerPropertyId: string
    rating: number
    reviewText: string
    isPublished: boolean
    createdAt: Date
    updatedAt: Date
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    customerId?: boolean
    partnerPropertyId?: boolean
    rating?: boolean
    reviewText?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    partnerProperty?: boolean | PartnerPropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    customerId?: boolean
    partnerPropertyId?: boolean
    rating?: boolean
    reviewText?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    partnerProperty?: boolean | PartnerPropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    bookingId?: boolean
    customerId?: boolean
    partnerPropertyId?: boolean
    rating?: boolean
    reviewText?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    partnerProperty?: boolean | PartnerPropertyDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | BookingDefaultArgs<ExtArgs>
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    partnerProperty?: boolean | PartnerPropertyDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs>
      customer: Prisma.$CustomerPayload<ExtArgs>
      partnerProperty: Prisma.$PartnerPropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookingId: string
      customerId: string
      partnerPropertyId: string
      rating: number
      reviewText: string
      isPublished: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
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
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends BookingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookingDefaultArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    partnerProperty<T extends PartnerPropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartnerPropertyDefaultArgs<ExtArgs>>): Prisma__PartnerPropertyClient<$Result.GetResult<Prisma.$PartnerPropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Review model
   */ 
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly bookingId: FieldRef<"Review", 'String'>
    readonly customerId: FieldRef<"Review", 'String'>
    readonly partnerPropertyId: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly reviewText: FieldRef<"Review", 'String'>
    readonly isPublished: FieldRef<"Review", 'Boolean'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
    readonly updatedAt: FieldRef<"Review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model SecurityAuditLog
   */

  export type AggregateSecurityAuditLog = {
    _count: SecurityAuditLogCountAggregateOutputType | null
    _min: SecurityAuditLogMinAggregateOutputType | null
    _max: SecurityAuditLogMaxAggregateOutputType | null
  }

  export type SecurityAuditLogMinAggregateOutputType = {
    id: string | null
    adminUserId: string | null
    action: string | null
    resourceType: string | null
    resourceId: string | null
    reason: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type SecurityAuditLogMaxAggregateOutputType = {
    id: string | null
    adminUserId: string | null
    action: string | null
    resourceType: string | null
    resourceId: string | null
    reason: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type SecurityAuditLogCountAggregateOutputType = {
    id: number
    adminUserId: number
    action: number
    resourceType: number
    resourceId: number
    reason: number
    ipAddress: number
    createdAt: number
    _all: number
  }


  export type SecurityAuditLogMinAggregateInputType = {
    id?: true
    adminUserId?: true
    action?: true
    resourceType?: true
    resourceId?: true
    reason?: true
    ipAddress?: true
    createdAt?: true
  }

  export type SecurityAuditLogMaxAggregateInputType = {
    id?: true
    adminUserId?: true
    action?: true
    resourceType?: true
    resourceId?: true
    reason?: true
    ipAddress?: true
    createdAt?: true
  }

  export type SecurityAuditLogCountAggregateInputType = {
    id?: true
    adminUserId?: true
    action?: true
    resourceType?: true
    resourceId?: true
    reason?: true
    ipAddress?: true
    createdAt?: true
    _all?: true
  }

  export type SecurityAuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SecurityAuditLog to aggregate.
     */
    where?: SecurityAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityAuditLogs to fetch.
     */
    orderBy?: SecurityAuditLogOrderByWithRelationInput | SecurityAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SecurityAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SecurityAuditLogs
    **/
    _count?: true | SecurityAuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SecurityAuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SecurityAuditLogMaxAggregateInputType
  }

  export type GetSecurityAuditLogAggregateType<T extends SecurityAuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSecurityAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSecurityAuditLog[P]>
      : GetScalarType<T[P], AggregateSecurityAuditLog[P]>
  }




  export type SecurityAuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SecurityAuditLogWhereInput
    orderBy?: SecurityAuditLogOrderByWithAggregationInput | SecurityAuditLogOrderByWithAggregationInput[]
    by: SecurityAuditLogScalarFieldEnum[] | SecurityAuditLogScalarFieldEnum
    having?: SecurityAuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SecurityAuditLogCountAggregateInputType | true
    _min?: SecurityAuditLogMinAggregateInputType
    _max?: SecurityAuditLogMaxAggregateInputType
  }

  export type SecurityAuditLogGroupByOutputType = {
    id: string
    adminUserId: string
    action: string
    resourceType: string
    resourceId: string
    reason: string
    ipAddress: string
    createdAt: Date
    _count: SecurityAuditLogCountAggregateOutputType | null
    _min: SecurityAuditLogMinAggregateOutputType | null
    _max: SecurityAuditLogMaxAggregateOutputType | null
  }

  type GetSecurityAuditLogGroupByPayload<T extends SecurityAuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SecurityAuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SecurityAuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SecurityAuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], SecurityAuditLogGroupByOutputType[P]>
        }
      >
    >


  export type SecurityAuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    reason?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["securityAuditLog"]>

  export type SecurityAuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    reason?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["securityAuditLog"]>

  export type SecurityAuditLogSelectScalar = {
    id?: boolean
    adminUserId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    reason?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }

  export type SecurityAuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }
  export type SecurityAuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminUser?: boolean | AdminUserDefaultArgs<ExtArgs>
  }

  export type $SecurityAuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SecurityAuditLog"
    objects: {
      adminUser: Prisma.$AdminUserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      adminUserId: string
      action: string
      resourceType: string
      resourceId: string
      reason: string
      ipAddress: string
      createdAt: Date
    }, ExtArgs["result"]["securityAuditLog"]>
    composites: {}
  }

  type SecurityAuditLogGetPayload<S extends boolean | null | undefined | SecurityAuditLogDefaultArgs> = $Result.GetResult<Prisma.$SecurityAuditLogPayload, S>

  type SecurityAuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SecurityAuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SecurityAuditLogCountAggregateInputType | true
    }

  export interface SecurityAuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SecurityAuditLog'], meta: { name: 'SecurityAuditLog' } }
    /**
     * Find zero or one SecurityAuditLog that matches the filter.
     * @param {SecurityAuditLogFindUniqueArgs} args - Arguments to find a SecurityAuditLog
     * @example
     * // Get one SecurityAuditLog
     * const securityAuditLog = await prisma.securityAuditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SecurityAuditLogFindUniqueArgs>(args: SelectSubset<T, SecurityAuditLogFindUniqueArgs<ExtArgs>>): Prisma__SecurityAuditLogClient<$Result.GetResult<Prisma.$SecurityAuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SecurityAuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SecurityAuditLogFindUniqueOrThrowArgs} args - Arguments to find a SecurityAuditLog
     * @example
     * // Get one SecurityAuditLog
     * const securityAuditLog = await prisma.securityAuditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SecurityAuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SecurityAuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SecurityAuditLogClient<$Result.GetResult<Prisma.$SecurityAuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SecurityAuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityAuditLogFindFirstArgs} args - Arguments to find a SecurityAuditLog
     * @example
     * // Get one SecurityAuditLog
     * const securityAuditLog = await prisma.securityAuditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SecurityAuditLogFindFirstArgs>(args?: SelectSubset<T, SecurityAuditLogFindFirstArgs<ExtArgs>>): Prisma__SecurityAuditLogClient<$Result.GetResult<Prisma.$SecurityAuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SecurityAuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityAuditLogFindFirstOrThrowArgs} args - Arguments to find a SecurityAuditLog
     * @example
     * // Get one SecurityAuditLog
     * const securityAuditLog = await prisma.securityAuditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SecurityAuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SecurityAuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SecurityAuditLogClient<$Result.GetResult<Prisma.$SecurityAuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SecurityAuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityAuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SecurityAuditLogs
     * const securityAuditLogs = await prisma.securityAuditLog.findMany()
     * 
     * // Get first 10 SecurityAuditLogs
     * const securityAuditLogs = await prisma.securityAuditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const securityAuditLogWithIdOnly = await prisma.securityAuditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SecurityAuditLogFindManyArgs>(args?: SelectSubset<T, SecurityAuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityAuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SecurityAuditLog.
     * @param {SecurityAuditLogCreateArgs} args - Arguments to create a SecurityAuditLog.
     * @example
     * // Create one SecurityAuditLog
     * const SecurityAuditLog = await prisma.securityAuditLog.create({
     *   data: {
     *     // ... data to create a SecurityAuditLog
     *   }
     * })
     * 
     */
    create<T extends SecurityAuditLogCreateArgs>(args: SelectSubset<T, SecurityAuditLogCreateArgs<ExtArgs>>): Prisma__SecurityAuditLogClient<$Result.GetResult<Prisma.$SecurityAuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SecurityAuditLogs.
     * @param {SecurityAuditLogCreateManyArgs} args - Arguments to create many SecurityAuditLogs.
     * @example
     * // Create many SecurityAuditLogs
     * const securityAuditLog = await prisma.securityAuditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SecurityAuditLogCreateManyArgs>(args?: SelectSubset<T, SecurityAuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SecurityAuditLogs and returns the data saved in the database.
     * @param {SecurityAuditLogCreateManyAndReturnArgs} args - Arguments to create many SecurityAuditLogs.
     * @example
     * // Create many SecurityAuditLogs
     * const securityAuditLog = await prisma.securityAuditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SecurityAuditLogs and only return the `id`
     * const securityAuditLogWithIdOnly = await prisma.securityAuditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SecurityAuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SecurityAuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityAuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SecurityAuditLog.
     * @param {SecurityAuditLogDeleteArgs} args - Arguments to delete one SecurityAuditLog.
     * @example
     * // Delete one SecurityAuditLog
     * const SecurityAuditLog = await prisma.securityAuditLog.delete({
     *   where: {
     *     // ... filter to delete one SecurityAuditLog
     *   }
     * })
     * 
     */
    delete<T extends SecurityAuditLogDeleteArgs>(args: SelectSubset<T, SecurityAuditLogDeleteArgs<ExtArgs>>): Prisma__SecurityAuditLogClient<$Result.GetResult<Prisma.$SecurityAuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SecurityAuditLog.
     * @param {SecurityAuditLogUpdateArgs} args - Arguments to update one SecurityAuditLog.
     * @example
     * // Update one SecurityAuditLog
     * const securityAuditLog = await prisma.securityAuditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SecurityAuditLogUpdateArgs>(args: SelectSubset<T, SecurityAuditLogUpdateArgs<ExtArgs>>): Prisma__SecurityAuditLogClient<$Result.GetResult<Prisma.$SecurityAuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SecurityAuditLogs.
     * @param {SecurityAuditLogDeleteManyArgs} args - Arguments to filter SecurityAuditLogs to delete.
     * @example
     * // Delete a few SecurityAuditLogs
     * const { count } = await prisma.securityAuditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SecurityAuditLogDeleteManyArgs>(args?: SelectSubset<T, SecurityAuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SecurityAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityAuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SecurityAuditLogs
     * const securityAuditLog = await prisma.securityAuditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SecurityAuditLogUpdateManyArgs>(args: SelectSubset<T, SecurityAuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SecurityAuditLog.
     * @param {SecurityAuditLogUpsertArgs} args - Arguments to update or create a SecurityAuditLog.
     * @example
     * // Update or create a SecurityAuditLog
     * const securityAuditLog = await prisma.securityAuditLog.upsert({
     *   create: {
     *     // ... data to create a SecurityAuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SecurityAuditLog we want to update
     *   }
     * })
     */
    upsert<T extends SecurityAuditLogUpsertArgs>(args: SelectSubset<T, SecurityAuditLogUpsertArgs<ExtArgs>>): Prisma__SecurityAuditLogClient<$Result.GetResult<Prisma.$SecurityAuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SecurityAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityAuditLogCountArgs} args - Arguments to filter SecurityAuditLogs to count.
     * @example
     * // Count the number of SecurityAuditLogs
     * const count = await prisma.securityAuditLog.count({
     *   where: {
     *     // ... the filter for the SecurityAuditLogs we want to count
     *   }
     * })
    **/
    count<T extends SecurityAuditLogCountArgs>(
      args?: Subset<T, SecurityAuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SecurityAuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SecurityAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityAuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SecurityAuditLogAggregateArgs>(args: Subset<T, SecurityAuditLogAggregateArgs>): Prisma.PrismaPromise<GetSecurityAuditLogAggregateType<T>>

    /**
     * Group by SecurityAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityAuditLogGroupByArgs} args - Group by arguments.
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
      T extends SecurityAuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SecurityAuditLogGroupByArgs['orderBy'] }
        : { orderBy?: SecurityAuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SecurityAuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSecurityAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SecurityAuditLog model
   */
  readonly fields: SecurityAuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SecurityAuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SecurityAuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    adminUser<T extends AdminUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AdminUserDefaultArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the SecurityAuditLog model
   */ 
  interface SecurityAuditLogFieldRefs {
    readonly id: FieldRef<"SecurityAuditLog", 'String'>
    readonly adminUserId: FieldRef<"SecurityAuditLog", 'String'>
    readonly action: FieldRef<"SecurityAuditLog", 'String'>
    readonly resourceType: FieldRef<"SecurityAuditLog", 'String'>
    readonly resourceId: FieldRef<"SecurityAuditLog", 'String'>
    readonly reason: FieldRef<"SecurityAuditLog", 'String'>
    readonly ipAddress: FieldRef<"SecurityAuditLog", 'String'>
    readonly createdAt: FieldRef<"SecurityAuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SecurityAuditLog findUnique
   */
  export type SecurityAuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAuditLog
     */
    select?: SecurityAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which SecurityAuditLog to fetch.
     */
    where: SecurityAuditLogWhereUniqueInput
  }

  /**
   * SecurityAuditLog findUniqueOrThrow
   */
  export type SecurityAuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAuditLog
     */
    select?: SecurityAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which SecurityAuditLog to fetch.
     */
    where: SecurityAuditLogWhereUniqueInput
  }

  /**
   * SecurityAuditLog findFirst
   */
  export type SecurityAuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAuditLog
     */
    select?: SecurityAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which SecurityAuditLog to fetch.
     */
    where?: SecurityAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityAuditLogs to fetch.
     */
    orderBy?: SecurityAuditLogOrderByWithRelationInput | SecurityAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecurityAuditLogs.
     */
    cursor?: SecurityAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecurityAuditLogs.
     */
    distinct?: SecurityAuditLogScalarFieldEnum | SecurityAuditLogScalarFieldEnum[]
  }

  /**
   * SecurityAuditLog findFirstOrThrow
   */
  export type SecurityAuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAuditLog
     */
    select?: SecurityAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which SecurityAuditLog to fetch.
     */
    where?: SecurityAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityAuditLogs to fetch.
     */
    orderBy?: SecurityAuditLogOrderByWithRelationInput | SecurityAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecurityAuditLogs.
     */
    cursor?: SecurityAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecurityAuditLogs.
     */
    distinct?: SecurityAuditLogScalarFieldEnum | SecurityAuditLogScalarFieldEnum[]
  }

  /**
   * SecurityAuditLog findMany
   */
  export type SecurityAuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAuditLog
     */
    select?: SecurityAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which SecurityAuditLogs to fetch.
     */
    where?: SecurityAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityAuditLogs to fetch.
     */
    orderBy?: SecurityAuditLogOrderByWithRelationInput | SecurityAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SecurityAuditLogs.
     */
    cursor?: SecurityAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityAuditLogs.
     */
    skip?: number
    distinct?: SecurityAuditLogScalarFieldEnum | SecurityAuditLogScalarFieldEnum[]
  }

  /**
   * SecurityAuditLog create
   */
  export type SecurityAuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAuditLog
     */
    select?: SecurityAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityAuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a SecurityAuditLog.
     */
    data: XOR<SecurityAuditLogCreateInput, SecurityAuditLogUncheckedCreateInput>
  }

  /**
   * SecurityAuditLog createMany
   */
  export type SecurityAuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SecurityAuditLogs.
     */
    data: SecurityAuditLogCreateManyInput | SecurityAuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SecurityAuditLog createManyAndReturn
   */
  export type SecurityAuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAuditLog
     */
    select?: SecurityAuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SecurityAuditLogs.
     */
    data: SecurityAuditLogCreateManyInput | SecurityAuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityAuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SecurityAuditLog update
   */
  export type SecurityAuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAuditLog
     */
    select?: SecurityAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityAuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a SecurityAuditLog.
     */
    data: XOR<SecurityAuditLogUpdateInput, SecurityAuditLogUncheckedUpdateInput>
    /**
     * Choose, which SecurityAuditLog to update.
     */
    where: SecurityAuditLogWhereUniqueInput
  }

  /**
   * SecurityAuditLog updateMany
   */
  export type SecurityAuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SecurityAuditLogs.
     */
    data: XOR<SecurityAuditLogUpdateManyMutationInput, SecurityAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which SecurityAuditLogs to update
     */
    where?: SecurityAuditLogWhereInput
  }

  /**
   * SecurityAuditLog upsert
   */
  export type SecurityAuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAuditLog
     */
    select?: SecurityAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityAuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the SecurityAuditLog to update in case it exists.
     */
    where: SecurityAuditLogWhereUniqueInput
    /**
     * In case the SecurityAuditLog found by the `where` argument doesn't exist, create a new SecurityAuditLog with this data.
     */
    create: XOR<SecurityAuditLogCreateInput, SecurityAuditLogUncheckedCreateInput>
    /**
     * In case the SecurityAuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SecurityAuditLogUpdateInput, SecurityAuditLogUncheckedUpdateInput>
  }

  /**
   * SecurityAuditLog delete
   */
  export type SecurityAuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAuditLog
     */
    select?: SecurityAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityAuditLogInclude<ExtArgs> | null
    /**
     * Filter which SecurityAuditLog to delete.
     */
    where: SecurityAuditLogWhereUniqueInput
  }

  /**
   * SecurityAuditLog deleteMany
   */
  export type SecurityAuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SecurityAuditLogs to delete
     */
    where?: SecurityAuditLogWhereInput
  }

  /**
   * SecurityAuditLog without action
   */
  export type SecurityAuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAuditLog
     */
    select?: SecurityAuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SecurityAuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    fullName: 'fullName',
    phoneNumber: 'phoneNumber',
    isVerified: 'isVerified',
    verificationToken: 'verificationToken',
    avatarUrl: 'avatarUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const AdminUserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    fullName: 'fullName',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminUserScalarFieldEnum = (typeof AdminUserScalarFieldEnum)[keyof typeof AdminUserScalarFieldEnum]


  export const PartnerPropertyScalarFieldEnum: {
    id: 'id',
    kmPropertyId: 'kmPropertyId',
    ownerName: 'ownerName',
    ownerPhone: 'ownerPhone',
    ownerWhatsapp: 'ownerWhatsapp',
    name: 'name',
    slug: 'slug',
    address: 'address',
    city: 'city',
    district: 'district',
    latitude: 'latitude',
    longitude: 'longitude',
    description: 'description',
    genderType: 'genderType',
    generalFacilities: 'generalFacilities',
    photos: 'photos',
    termsAndRules: 'termsAndRules',
    requirementsSchema: 'requirementsSchema',
    paymentBankName: 'paymentBankName',
    paymentAccountNumber: 'paymentAccountNumber',
    paymentAccountHolder: 'paymentAccountHolder',
    paymentQrisUrl: 'paymentQrisUrl',
    partnershipStatus: 'partnershipStatus',
    rejectionReason: 'rejectionReason',
    avgRating: 'avgRating',
    totalReviews: 'totalReviews',
    lastSyncedAt: 'lastSyncedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PartnerPropertyScalarFieldEnum = (typeof PartnerPropertyScalarFieldEnum)[keyof typeof PartnerPropertyScalarFieldEnum]


  export const PartnerRoomScalarFieldEnum: {
    id: 'id',
    kmRoomId: 'kmRoomId',
    partnerPropertyId: 'partnerPropertyId',
    roomNumber: 'roomNumber',
    roomType: 'roomType',
    sizeSqm: 'sizeSqm',
    facilities: 'facilities',
    photos: 'photos',
    monthlyPrice: 'monthlyPrice',
    totalCapacity: 'totalCapacity',
    occupiedSlots: 'occupiedSlots',
    reservedSlots: 'reservedSlots',
    status: 'status',
    lastSyncedAt: 'lastSyncedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PartnerRoomScalarFieldEnum = (typeof PartnerRoomScalarFieldEnum)[keyof typeof PartnerRoomScalarFieldEnum]


  export const BookingScalarFieldEnum: {
    id: 'id',
    bookingCode: 'bookingCode',
    customerId: 'customerId',
    partnerPropertyId: 'partnerPropertyId',
    partnerRoomId: 'partnerRoomId',
    slotsCount: 'slotsCount',
    durationMonths: 'durationMonths',
    startDate: 'startDate',
    endDate: 'endDate',
    pricePerSlot: 'pricePerSlot',
    totalAmount: 'totalAmount',
    occupantsData: 'occupantsData',
    status: 'status',
    cancellationReason: 'cancellationReason',
    paymentDeadline: 'paymentDeadline',
    verificationDeadline: 'verificationDeadline',
    checkInDeadline: 'checkInDeadline',
    isNeedsAttention: 'isNeedsAttention',
    idempotencyKey: 'idempotencyKey',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const PaymentSubmissionScalarFieldEnum: {
    id: 'id',
    bookingId: 'bookingId',
    transferReceiptUrl: 'transferReceiptUrl',
    senderBankName: 'senderBankName',
    senderAccountHolder: 'senderAccountHolder',
    submissionNotes: 'submissionNotes',
    submittedAt: 'submittedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentSubmissionScalarFieldEnum = (typeof PaymentSubmissionScalarFieldEnum)[keyof typeof PaymentSubmissionScalarFieldEnum]


  export const RefundRequestScalarFieldEnum: {
    id: 'id',
    bookingId: 'bookingId',
    bankName: 'bankName',
    accountNumber: 'accountNumber',
    accountHolder: 'accountHolder',
    refundAmount: 'refundAmount',
    penaltyDeduction: 'penaltyDeduction',
    status: 'status',
    requestedAt: 'requestedAt',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RefundRequestScalarFieldEnum = (typeof RefundRequestScalarFieldEnum)[keyof typeof RefundRequestScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    bookingId: 'bookingId',
    customerId: 'customerId',
    partnerPropertyId: 'partnerPropertyId',
    rating: 'rating',
    reviewText: 'reviewText',
    isPublished: 'isPublished',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const SecurityAuditLogScalarFieldEnum: {
    id: 'id',
    adminUserId: 'adminUserId',
    action: 'action',
    resourceType: 'resourceType',
    resourceId: 'resourceId',
    reason: 'reason',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt'
  };

  export type SecurityAuditLogScalarFieldEnum = (typeof SecurityAuditLogScalarFieldEnum)[keyof typeof SecurityAuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    email?: StringFilter<"Customer"> | string
    passwordHash?: StringFilter<"Customer"> | string
    fullName?: StringFilter<"Customer"> | string
    phoneNumber?: StringFilter<"Customer"> | string
    isVerified?: BoolFilter<"Customer"> | boolean
    verificationToken?: StringNullableFilter<"Customer"> | string | null
    avatarUrl?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    bookings?: BookingListRelationFilter
    reviews?: ReviewListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrder
    isVerified?: SortOrder
    verificationToken?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bookings?: BookingOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    passwordHash?: StringFilter<"Customer"> | string
    fullName?: StringFilter<"Customer"> | string
    phoneNumber?: StringFilter<"Customer"> | string
    isVerified?: BoolFilter<"Customer"> | boolean
    verificationToken?: StringNullableFilter<"Customer"> | string | null
    avatarUrl?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    bookings?: BookingListRelationFilter
    reviews?: ReviewListRelationFilter
  }, "id" | "email">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrder
    isVerified?: SortOrder
    verificationToken?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    email?: StringWithAggregatesFilter<"Customer"> | string
    passwordHash?: StringWithAggregatesFilter<"Customer"> | string
    fullName?: StringWithAggregatesFilter<"Customer"> | string
    phoneNumber?: StringWithAggregatesFilter<"Customer"> | string
    isVerified?: BoolWithAggregatesFilter<"Customer"> | boolean
    verificationToken?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type AdminUserWhereInput = {
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    id?: StringFilter<"AdminUser"> | string
    email?: StringFilter<"AdminUser"> | string
    passwordHash?: StringFilter<"AdminUser"> | string
    fullName?: StringFilter<"AdminUser"> | string
    role?: StringFilter<"AdminUser"> | string
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
    auditLogs?: SecurityAuditLogListRelationFilter
  }

  export type AdminUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    auditLogs?: SecurityAuditLogOrderByRelationAggregateInput
  }

  export type AdminUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    passwordHash?: StringFilter<"AdminUser"> | string
    fullName?: StringFilter<"AdminUser"> | string
    role?: StringFilter<"AdminUser"> | string
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
    auditLogs?: SecurityAuditLogListRelationFilter
  }, "id" | "email">

  export type AdminUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminUserCountOrderByAggregateInput
    _max?: AdminUserMaxOrderByAggregateInput
    _min?: AdminUserMinOrderByAggregateInput
  }

  export type AdminUserScalarWhereWithAggregatesInput = {
    AND?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    OR?: AdminUserScalarWhereWithAggregatesInput[]
    NOT?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminUser"> | string
    email?: StringWithAggregatesFilter<"AdminUser"> | string
    passwordHash?: StringWithAggregatesFilter<"AdminUser"> | string
    fullName?: StringWithAggregatesFilter<"AdminUser"> | string
    role?: StringWithAggregatesFilter<"AdminUser"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
  }

  export type PartnerPropertyWhereInput = {
    AND?: PartnerPropertyWhereInput | PartnerPropertyWhereInput[]
    OR?: PartnerPropertyWhereInput[]
    NOT?: PartnerPropertyWhereInput | PartnerPropertyWhereInput[]
    id?: StringFilter<"PartnerProperty"> | string
    kmPropertyId?: StringFilter<"PartnerProperty"> | string
    ownerName?: StringFilter<"PartnerProperty"> | string
    ownerPhone?: StringFilter<"PartnerProperty"> | string
    ownerWhatsapp?: StringFilter<"PartnerProperty"> | string
    name?: StringFilter<"PartnerProperty"> | string
    slug?: StringFilter<"PartnerProperty"> | string
    address?: StringFilter<"PartnerProperty"> | string
    city?: StringFilter<"PartnerProperty"> | string
    district?: StringFilter<"PartnerProperty"> | string
    latitude?: FloatNullableFilter<"PartnerProperty"> | number | null
    longitude?: FloatNullableFilter<"PartnerProperty"> | number | null
    description?: StringNullableFilter<"PartnerProperty"> | string | null
    genderType?: StringFilter<"PartnerProperty"> | string
    generalFacilities?: StringFilter<"PartnerProperty"> | string
    photos?: StringFilter<"PartnerProperty"> | string
    termsAndRules?: StringNullableFilter<"PartnerProperty"> | string | null
    requirementsSchema?: StringFilter<"PartnerProperty"> | string
    paymentBankName?: StringFilter<"PartnerProperty"> | string
    paymentAccountNumber?: StringFilter<"PartnerProperty"> | string
    paymentAccountHolder?: StringFilter<"PartnerProperty"> | string
    paymentQrisUrl?: StringNullableFilter<"PartnerProperty"> | string | null
    partnershipStatus?: StringFilter<"PartnerProperty"> | string
    rejectionReason?: StringNullableFilter<"PartnerProperty"> | string | null
    avgRating?: FloatFilter<"PartnerProperty"> | number
    totalReviews?: IntFilter<"PartnerProperty"> | number
    lastSyncedAt?: DateTimeNullableFilter<"PartnerProperty"> | Date | string | null
    createdAt?: DateTimeFilter<"PartnerProperty"> | Date | string
    updatedAt?: DateTimeFilter<"PartnerProperty"> | Date | string
    rooms?: PartnerRoomListRelationFilter
    bookings?: BookingListRelationFilter
    reviews?: ReviewListRelationFilter
  }

  export type PartnerPropertyOrderByWithRelationInput = {
    id?: SortOrder
    kmPropertyId?: SortOrder
    ownerName?: SortOrder
    ownerPhone?: SortOrder
    ownerWhatsapp?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    address?: SortOrder
    city?: SortOrder
    district?: SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    genderType?: SortOrder
    generalFacilities?: SortOrder
    photos?: SortOrder
    termsAndRules?: SortOrderInput | SortOrder
    requirementsSchema?: SortOrder
    paymentBankName?: SortOrder
    paymentAccountNumber?: SortOrder
    paymentAccountHolder?: SortOrder
    paymentQrisUrl?: SortOrderInput | SortOrder
    partnershipStatus?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    avgRating?: SortOrder
    totalReviews?: SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rooms?: PartnerRoomOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
  }

  export type PartnerPropertyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    kmPropertyId?: string
    slug?: string
    AND?: PartnerPropertyWhereInput | PartnerPropertyWhereInput[]
    OR?: PartnerPropertyWhereInput[]
    NOT?: PartnerPropertyWhereInput | PartnerPropertyWhereInput[]
    ownerName?: StringFilter<"PartnerProperty"> | string
    ownerPhone?: StringFilter<"PartnerProperty"> | string
    ownerWhatsapp?: StringFilter<"PartnerProperty"> | string
    name?: StringFilter<"PartnerProperty"> | string
    address?: StringFilter<"PartnerProperty"> | string
    city?: StringFilter<"PartnerProperty"> | string
    district?: StringFilter<"PartnerProperty"> | string
    latitude?: FloatNullableFilter<"PartnerProperty"> | number | null
    longitude?: FloatNullableFilter<"PartnerProperty"> | number | null
    description?: StringNullableFilter<"PartnerProperty"> | string | null
    genderType?: StringFilter<"PartnerProperty"> | string
    generalFacilities?: StringFilter<"PartnerProperty"> | string
    photos?: StringFilter<"PartnerProperty"> | string
    termsAndRules?: StringNullableFilter<"PartnerProperty"> | string | null
    requirementsSchema?: StringFilter<"PartnerProperty"> | string
    paymentBankName?: StringFilter<"PartnerProperty"> | string
    paymentAccountNumber?: StringFilter<"PartnerProperty"> | string
    paymentAccountHolder?: StringFilter<"PartnerProperty"> | string
    paymentQrisUrl?: StringNullableFilter<"PartnerProperty"> | string | null
    partnershipStatus?: StringFilter<"PartnerProperty"> | string
    rejectionReason?: StringNullableFilter<"PartnerProperty"> | string | null
    avgRating?: FloatFilter<"PartnerProperty"> | number
    totalReviews?: IntFilter<"PartnerProperty"> | number
    lastSyncedAt?: DateTimeNullableFilter<"PartnerProperty"> | Date | string | null
    createdAt?: DateTimeFilter<"PartnerProperty"> | Date | string
    updatedAt?: DateTimeFilter<"PartnerProperty"> | Date | string
    rooms?: PartnerRoomListRelationFilter
    bookings?: BookingListRelationFilter
    reviews?: ReviewListRelationFilter
  }, "id" | "kmPropertyId" | "slug">

  export type PartnerPropertyOrderByWithAggregationInput = {
    id?: SortOrder
    kmPropertyId?: SortOrder
    ownerName?: SortOrder
    ownerPhone?: SortOrder
    ownerWhatsapp?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    address?: SortOrder
    city?: SortOrder
    district?: SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    genderType?: SortOrder
    generalFacilities?: SortOrder
    photos?: SortOrder
    termsAndRules?: SortOrderInput | SortOrder
    requirementsSchema?: SortOrder
    paymentBankName?: SortOrder
    paymentAccountNumber?: SortOrder
    paymentAccountHolder?: SortOrder
    paymentQrisUrl?: SortOrderInput | SortOrder
    partnershipStatus?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    avgRating?: SortOrder
    totalReviews?: SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PartnerPropertyCountOrderByAggregateInput
    _avg?: PartnerPropertyAvgOrderByAggregateInput
    _max?: PartnerPropertyMaxOrderByAggregateInput
    _min?: PartnerPropertyMinOrderByAggregateInput
    _sum?: PartnerPropertySumOrderByAggregateInput
  }

  export type PartnerPropertyScalarWhereWithAggregatesInput = {
    AND?: PartnerPropertyScalarWhereWithAggregatesInput | PartnerPropertyScalarWhereWithAggregatesInput[]
    OR?: PartnerPropertyScalarWhereWithAggregatesInput[]
    NOT?: PartnerPropertyScalarWhereWithAggregatesInput | PartnerPropertyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PartnerProperty"> | string
    kmPropertyId?: StringWithAggregatesFilter<"PartnerProperty"> | string
    ownerName?: StringWithAggregatesFilter<"PartnerProperty"> | string
    ownerPhone?: StringWithAggregatesFilter<"PartnerProperty"> | string
    ownerWhatsapp?: StringWithAggregatesFilter<"PartnerProperty"> | string
    name?: StringWithAggregatesFilter<"PartnerProperty"> | string
    slug?: StringWithAggregatesFilter<"PartnerProperty"> | string
    address?: StringWithAggregatesFilter<"PartnerProperty"> | string
    city?: StringWithAggregatesFilter<"PartnerProperty"> | string
    district?: StringWithAggregatesFilter<"PartnerProperty"> | string
    latitude?: FloatNullableWithAggregatesFilter<"PartnerProperty"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"PartnerProperty"> | number | null
    description?: StringNullableWithAggregatesFilter<"PartnerProperty"> | string | null
    genderType?: StringWithAggregatesFilter<"PartnerProperty"> | string
    generalFacilities?: StringWithAggregatesFilter<"PartnerProperty"> | string
    photos?: StringWithAggregatesFilter<"PartnerProperty"> | string
    termsAndRules?: StringNullableWithAggregatesFilter<"PartnerProperty"> | string | null
    requirementsSchema?: StringWithAggregatesFilter<"PartnerProperty"> | string
    paymentBankName?: StringWithAggregatesFilter<"PartnerProperty"> | string
    paymentAccountNumber?: StringWithAggregatesFilter<"PartnerProperty"> | string
    paymentAccountHolder?: StringWithAggregatesFilter<"PartnerProperty"> | string
    paymentQrisUrl?: StringNullableWithAggregatesFilter<"PartnerProperty"> | string | null
    partnershipStatus?: StringWithAggregatesFilter<"PartnerProperty"> | string
    rejectionReason?: StringNullableWithAggregatesFilter<"PartnerProperty"> | string | null
    avgRating?: FloatWithAggregatesFilter<"PartnerProperty"> | number
    totalReviews?: IntWithAggregatesFilter<"PartnerProperty"> | number
    lastSyncedAt?: DateTimeNullableWithAggregatesFilter<"PartnerProperty"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PartnerProperty"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PartnerProperty"> | Date | string
  }

  export type PartnerRoomWhereInput = {
    AND?: PartnerRoomWhereInput | PartnerRoomWhereInput[]
    OR?: PartnerRoomWhereInput[]
    NOT?: PartnerRoomWhereInput | PartnerRoomWhereInput[]
    id?: StringFilter<"PartnerRoom"> | string
    kmRoomId?: StringFilter<"PartnerRoom"> | string
    partnerPropertyId?: StringFilter<"PartnerRoom"> | string
    roomNumber?: StringFilter<"PartnerRoom"> | string
    roomType?: StringFilter<"PartnerRoom"> | string
    sizeSqm?: FloatNullableFilter<"PartnerRoom"> | number | null
    facilities?: StringFilter<"PartnerRoom"> | string
    photos?: StringFilter<"PartnerRoom"> | string
    monthlyPrice?: FloatFilter<"PartnerRoom"> | number
    totalCapacity?: IntFilter<"PartnerRoom"> | number
    occupiedSlots?: IntFilter<"PartnerRoom"> | number
    reservedSlots?: IntFilter<"PartnerRoom"> | number
    status?: StringFilter<"PartnerRoom"> | string
    lastSyncedAt?: DateTimeNullableFilter<"PartnerRoom"> | Date | string | null
    createdAt?: DateTimeFilter<"PartnerRoom"> | Date | string
    updatedAt?: DateTimeFilter<"PartnerRoom"> | Date | string
    partnerProperty?: XOR<PartnerPropertyRelationFilter, PartnerPropertyWhereInput>
    bookings?: BookingListRelationFilter
  }

  export type PartnerRoomOrderByWithRelationInput = {
    id?: SortOrder
    kmRoomId?: SortOrder
    partnerPropertyId?: SortOrder
    roomNumber?: SortOrder
    roomType?: SortOrder
    sizeSqm?: SortOrderInput | SortOrder
    facilities?: SortOrder
    photos?: SortOrder
    monthlyPrice?: SortOrder
    totalCapacity?: SortOrder
    occupiedSlots?: SortOrder
    reservedSlots?: SortOrder
    status?: SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    partnerProperty?: PartnerPropertyOrderByWithRelationInput
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type PartnerRoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    kmRoomId?: string
    AND?: PartnerRoomWhereInput | PartnerRoomWhereInput[]
    OR?: PartnerRoomWhereInput[]
    NOT?: PartnerRoomWhereInput | PartnerRoomWhereInput[]
    partnerPropertyId?: StringFilter<"PartnerRoom"> | string
    roomNumber?: StringFilter<"PartnerRoom"> | string
    roomType?: StringFilter<"PartnerRoom"> | string
    sizeSqm?: FloatNullableFilter<"PartnerRoom"> | number | null
    facilities?: StringFilter<"PartnerRoom"> | string
    photos?: StringFilter<"PartnerRoom"> | string
    monthlyPrice?: FloatFilter<"PartnerRoom"> | number
    totalCapacity?: IntFilter<"PartnerRoom"> | number
    occupiedSlots?: IntFilter<"PartnerRoom"> | number
    reservedSlots?: IntFilter<"PartnerRoom"> | number
    status?: StringFilter<"PartnerRoom"> | string
    lastSyncedAt?: DateTimeNullableFilter<"PartnerRoom"> | Date | string | null
    createdAt?: DateTimeFilter<"PartnerRoom"> | Date | string
    updatedAt?: DateTimeFilter<"PartnerRoom"> | Date | string
    partnerProperty?: XOR<PartnerPropertyRelationFilter, PartnerPropertyWhereInput>
    bookings?: BookingListRelationFilter
  }, "id" | "kmRoomId">

  export type PartnerRoomOrderByWithAggregationInput = {
    id?: SortOrder
    kmRoomId?: SortOrder
    partnerPropertyId?: SortOrder
    roomNumber?: SortOrder
    roomType?: SortOrder
    sizeSqm?: SortOrderInput | SortOrder
    facilities?: SortOrder
    photos?: SortOrder
    monthlyPrice?: SortOrder
    totalCapacity?: SortOrder
    occupiedSlots?: SortOrder
    reservedSlots?: SortOrder
    status?: SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PartnerRoomCountOrderByAggregateInput
    _avg?: PartnerRoomAvgOrderByAggregateInput
    _max?: PartnerRoomMaxOrderByAggregateInput
    _min?: PartnerRoomMinOrderByAggregateInput
    _sum?: PartnerRoomSumOrderByAggregateInput
  }

  export type PartnerRoomScalarWhereWithAggregatesInput = {
    AND?: PartnerRoomScalarWhereWithAggregatesInput | PartnerRoomScalarWhereWithAggregatesInput[]
    OR?: PartnerRoomScalarWhereWithAggregatesInput[]
    NOT?: PartnerRoomScalarWhereWithAggregatesInput | PartnerRoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PartnerRoom"> | string
    kmRoomId?: StringWithAggregatesFilter<"PartnerRoom"> | string
    partnerPropertyId?: StringWithAggregatesFilter<"PartnerRoom"> | string
    roomNumber?: StringWithAggregatesFilter<"PartnerRoom"> | string
    roomType?: StringWithAggregatesFilter<"PartnerRoom"> | string
    sizeSqm?: FloatNullableWithAggregatesFilter<"PartnerRoom"> | number | null
    facilities?: StringWithAggregatesFilter<"PartnerRoom"> | string
    photos?: StringWithAggregatesFilter<"PartnerRoom"> | string
    monthlyPrice?: FloatWithAggregatesFilter<"PartnerRoom"> | number
    totalCapacity?: IntWithAggregatesFilter<"PartnerRoom"> | number
    occupiedSlots?: IntWithAggregatesFilter<"PartnerRoom"> | number
    reservedSlots?: IntWithAggregatesFilter<"PartnerRoom"> | number
    status?: StringWithAggregatesFilter<"PartnerRoom"> | string
    lastSyncedAt?: DateTimeNullableWithAggregatesFilter<"PartnerRoom"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PartnerRoom"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PartnerRoom"> | Date | string
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: StringFilter<"Booking"> | string
    bookingCode?: StringFilter<"Booking"> | string
    customerId?: StringFilter<"Booking"> | string
    partnerPropertyId?: StringFilter<"Booking"> | string
    partnerRoomId?: StringFilter<"Booking"> | string
    slotsCount?: IntFilter<"Booking"> | number
    durationMonths?: IntFilter<"Booking"> | number
    startDate?: DateTimeFilter<"Booking"> | Date | string
    endDate?: DateTimeFilter<"Booking"> | Date | string
    pricePerSlot?: FloatFilter<"Booking"> | number
    totalAmount?: FloatFilter<"Booking"> | number
    occupantsData?: StringFilter<"Booking"> | string
    status?: StringFilter<"Booking"> | string
    cancellationReason?: StringNullableFilter<"Booking"> | string | null
    paymentDeadline?: DateTimeFilter<"Booking"> | Date | string
    verificationDeadline?: DateTimeNullableFilter<"Booking"> | Date | string | null
    checkInDeadline?: DateTimeNullableFilter<"Booking"> | Date | string | null
    isNeedsAttention?: BoolFilter<"Booking"> | boolean
    idempotencyKey?: StringFilter<"Booking"> | string
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    customer?: XOR<CustomerRelationFilter, CustomerWhereInput>
    partnerProperty?: XOR<PartnerPropertyRelationFilter, PartnerPropertyWhereInput>
    partnerRoom?: XOR<PartnerRoomRelationFilter, PartnerRoomWhereInput>
    paymentSubmission?: XOR<PaymentSubmissionNullableRelationFilter, PaymentSubmissionWhereInput> | null
    refundRequest?: XOR<RefundRequestNullableRelationFilter, RefundRequestWhereInput> | null
    review?: XOR<ReviewNullableRelationFilter, ReviewWhereInput> | null
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    bookingCode?: SortOrder
    customerId?: SortOrder
    partnerPropertyId?: SortOrder
    partnerRoomId?: SortOrder
    slotsCount?: SortOrder
    durationMonths?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    pricePerSlot?: SortOrder
    totalAmount?: SortOrder
    occupantsData?: SortOrder
    status?: SortOrder
    cancellationReason?: SortOrderInput | SortOrder
    paymentDeadline?: SortOrder
    verificationDeadline?: SortOrderInput | SortOrder
    checkInDeadline?: SortOrderInput | SortOrder
    isNeedsAttention?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    partnerProperty?: PartnerPropertyOrderByWithRelationInput
    partnerRoom?: PartnerRoomOrderByWithRelationInput
    paymentSubmission?: PaymentSubmissionOrderByWithRelationInput
    refundRequest?: RefundRequestOrderByWithRelationInput
    review?: ReviewOrderByWithRelationInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingCode?: string
    idempotencyKey?: string
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    customerId?: StringFilter<"Booking"> | string
    partnerPropertyId?: StringFilter<"Booking"> | string
    partnerRoomId?: StringFilter<"Booking"> | string
    slotsCount?: IntFilter<"Booking"> | number
    durationMonths?: IntFilter<"Booking"> | number
    startDate?: DateTimeFilter<"Booking"> | Date | string
    endDate?: DateTimeFilter<"Booking"> | Date | string
    pricePerSlot?: FloatFilter<"Booking"> | number
    totalAmount?: FloatFilter<"Booking"> | number
    occupantsData?: StringFilter<"Booking"> | string
    status?: StringFilter<"Booking"> | string
    cancellationReason?: StringNullableFilter<"Booking"> | string | null
    paymentDeadline?: DateTimeFilter<"Booking"> | Date | string
    verificationDeadline?: DateTimeNullableFilter<"Booking"> | Date | string | null
    checkInDeadline?: DateTimeNullableFilter<"Booking"> | Date | string | null
    isNeedsAttention?: BoolFilter<"Booking"> | boolean
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    customer?: XOR<CustomerRelationFilter, CustomerWhereInput>
    partnerProperty?: XOR<PartnerPropertyRelationFilter, PartnerPropertyWhereInput>
    partnerRoom?: XOR<PartnerRoomRelationFilter, PartnerRoomWhereInput>
    paymentSubmission?: XOR<PaymentSubmissionNullableRelationFilter, PaymentSubmissionWhereInput> | null
    refundRequest?: XOR<RefundRequestNullableRelationFilter, RefundRequestWhereInput> | null
    review?: XOR<ReviewNullableRelationFilter, ReviewWhereInput> | null
  }, "id" | "bookingCode" | "idempotencyKey">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    bookingCode?: SortOrder
    customerId?: SortOrder
    partnerPropertyId?: SortOrder
    partnerRoomId?: SortOrder
    slotsCount?: SortOrder
    durationMonths?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    pricePerSlot?: SortOrder
    totalAmount?: SortOrder
    occupantsData?: SortOrder
    status?: SortOrder
    cancellationReason?: SortOrderInput | SortOrder
    paymentDeadline?: SortOrder
    verificationDeadline?: SortOrderInput | SortOrder
    checkInDeadline?: SortOrderInput | SortOrder
    isNeedsAttention?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _avg?: BookingAvgOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
    _sum?: BookingSumOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Booking"> | string
    bookingCode?: StringWithAggregatesFilter<"Booking"> | string
    customerId?: StringWithAggregatesFilter<"Booking"> | string
    partnerPropertyId?: StringWithAggregatesFilter<"Booking"> | string
    partnerRoomId?: StringWithAggregatesFilter<"Booking"> | string
    slotsCount?: IntWithAggregatesFilter<"Booking"> | number
    durationMonths?: IntWithAggregatesFilter<"Booking"> | number
    startDate?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    pricePerSlot?: FloatWithAggregatesFilter<"Booking"> | number
    totalAmount?: FloatWithAggregatesFilter<"Booking"> | number
    occupantsData?: StringWithAggregatesFilter<"Booking"> | string
    status?: StringWithAggregatesFilter<"Booking"> | string
    cancellationReason?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    paymentDeadline?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    verificationDeadline?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
    checkInDeadline?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
    isNeedsAttention?: BoolWithAggregatesFilter<"Booking"> | boolean
    idempotencyKey?: StringWithAggregatesFilter<"Booking"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
  }

  export type PaymentSubmissionWhereInput = {
    AND?: PaymentSubmissionWhereInput | PaymentSubmissionWhereInput[]
    OR?: PaymentSubmissionWhereInput[]
    NOT?: PaymentSubmissionWhereInput | PaymentSubmissionWhereInput[]
    id?: StringFilter<"PaymentSubmission"> | string
    bookingId?: StringFilter<"PaymentSubmission"> | string
    transferReceiptUrl?: StringFilter<"PaymentSubmission"> | string
    senderBankName?: StringNullableFilter<"PaymentSubmission"> | string | null
    senderAccountHolder?: StringNullableFilter<"PaymentSubmission"> | string | null
    submissionNotes?: StringNullableFilter<"PaymentSubmission"> | string | null
    submittedAt?: DateTimeFilter<"PaymentSubmission"> | Date | string
    createdAt?: DateTimeFilter<"PaymentSubmission"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentSubmission"> | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
  }

  export type PaymentSubmissionOrderByWithRelationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    transferReceiptUrl?: SortOrder
    senderBankName?: SortOrderInput | SortOrder
    senderAccountHolder?: SortOrderInput | SortOrder
    submissionNotes?: SortOrderInput | SortOrder
    submittedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    booking?: BookingOrderByWithRelationInput
  }

  export type PaymentSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingId?: string
    AND?: PaymentSubmissionWhereInput | PaymentSubmissionWhereInput[]
    OR?: PaymentSubmissionWhereInput[]
    NOT?: PaymentSubmissionWhereInput | PaymentSubmissionWhereInput[]
    transferReceiptUrl?: StringFilter<"PaymentSubmission"> | string
    senderBankName?: StringNullableFilter<"PaymentSubmission"> | string | null
    senderAccountHolder?: StringNullableFilter<"PaymentSubmission"> | string | null
    submissionNotes?: StringNullableFilter<"PaymentSubmission"> | string | null
    submittedAt?: DateTimeFilter<"PaymentSubmission"> | Date | string
    createdAt?: DateTimeFilter<"PaymentSubmission"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentSubmission"> | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
  }, "id" | "bookingId">

  export type PaymentSubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    transferReceiptUrl?: SortOrder
    senderBankName?: SortOrderInput | SortOrder
    senderAccountHolder?: SortOrderInput | SortOrder
    submissionNotes?: SortOrderInput | SortOrder
    submittedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentSubmissionCountOrderByAggregateInput
    _max?: PaymentSubmissionMaxOrderByAggregateInput
    _min?: PaymentSubmissionMinOrderByAggregateInput
  }

  export type PaymentSubmissionScalarWhereWithAggregatesInput = {
    AND?: PaymentSubmissionScalarWhereWithAggregatesInput | PaymentSubmissionScalarWhereWithAggregatesInput[]
    OR?: PaymentSubmissionScalarWhereWithAggregatesInput[]
    NOT?: PaymentSubmissionScalarWhereWithAggregatesInput | PaymentSubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PaymentSubmission"> | string
    bookingId?: StringWithAggregatesFilter<"PaymentSubmission"> | string
    transferReceiptUrl?: StringWithAggregatesFilter<"PaymentSubmission"> | string
    senderBankName?: StringNullableWithAggregatesFilter<"PaymentSubmission"> | string | null
    senderAccountHolder?: StringNullableWithAggregatesFilter<"PaymentSubmission"> | string | null
    submissionNotes?: StringNullableWithAggregatesFilter<"PaymentSubmission"> | string | null
    submittedAt?: DateTimeWithAggregatesFilter<"PaymentSubmission"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PaymentSubmission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PaymentSubmission"> | Date | string
  }

  export type RefundRequestWhereInput = {
    AND?: RefundRequestWhereInput | RefundRequestWhereInput[]
    OR?: RefundRequestWhereInput[]
    NOT?: RefundRequestWhereInput | RefundRequestWhereInput[]
    id?: StringFilter<"RefundRequest"> | string
    bookingId?: StringFilter<"RefundRequest"> | string
    bankName?: StringFilter<"RefundRequest"> | string
    accountNumber?: StringFilter<"RefundRequest"> | string
    accountHolder?: StringFilter<"RefundRequest"> | string
    refundAmount?: FloatFilter<"RefundRequest"> | number
    penaltyDeduction?: FloatFilter<"RefundRequest"> | number
    status?: StringFilter<"RefundRequest"> | string
    requestedAt?: DateTimeFilter<"RefundRequest"> | Date | string
    completedAt?: DateTimeNullableFilter<"RefundRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"RefundRequest"> | Date | string
    updatedAt?: DateTimeFilter<"RefundRequest"> | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
  }

  export type RefundRequestOrderByWithRelationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    bankName?: SortOrder
    accountNumber?: SortOrder
    accountHolder?: SortOrder
    refundAmount?: SortOrder
    penaltyDeduction?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    booking?: BookingOrderByWithRelationInput
  }

  export type RefundRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingId?: string
    AND?: RefundRequestWhereInput | RefundRequestWhereInput[]
    OR?: RefundRequestWhereInput[]
    NOT?: RefundRequestWhereInput | RefundRequestWhereInput[]
    bankName?: StringFilter<"RefundRequest"> | string
    accountNumber?: StringFilter<"RefundRequest"> | string
    accountHolder?: StringFilter<"RefundRequest"> | string
    refundAmount?: FloatFilter<"RefundRequest"> | number
    penaltyDeduction?: FloatFilter<"RefundRequest"> | number
    status?: StringFilter<"RefundRequest"> | string
    requestedAt?: DateTimeFilter<"RefundRequest"> | Date | string
    completedAt?: DateTimeNullableFilter<"RefundRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"RefundRequest"> | Date | string
    updatedAt?: DateTimeFilter<"RefundRequest"> | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
  }, "id" | "bookingId">

  export type RefundRequestOrderByWithAggregationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    bankName?: SortOrder
    accountNumber?: SortOrder
    accountHolder?: SortOrder
    refundAmount?: SortOrder
    penaltyDeduction?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RefundRequestCountOrderByAggregateInput
    _avg?: RefundRequestAvgOrderByAggregateInput
    _max?: RefundRequestMaxOrderByAggregateInput
    _min?: RefundRequestMinOrderByAggregateInput
    _sum?: RefundRequestSumOrderByAggregateInput
  }

  export type RefundRequestScalarWhereWithAggregatesInput = {
    AND?: RefundRequestScalarWhereWithAggregatesInput | RefundRequestScalarWhereWithAggregatesInput[]
    OR?: RefundRequestScalarWhereWithAggregatesInput[]
    NOT?: RefundRequestScalarWhereWithAggregatesInput | RefundRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefundRequest"> | string
    bookingId?: StringWithAggregatesFilter<"RefundRequest"> | string
    bankName?: StringWithAggregatesFilter<"RefundRequest"> | string
    accountNumber?: StringWithAggregatesFilter<"RefundRequest"> | string
    accountHolder?: StringWithAggregatesFilter<"RefundRequest"> | string
    refundAmount?: FloatWithAggregatesFilter<"RefundRequest"> | number
    penaltyDeduction?: FloatWithAggregatesFilter<"RefundRequest"> | number
    status?: StringWithAggregatesFilter<"RefundRequest"> | string
    requestedAt?: DateTimeWithAggregatesFilter<"RefundRequest"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"RefundRequest"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RefundRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RefundRequest"> | Date | string
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    bookingId?: StringFilter<"Review"> | string
    customerId?: StringFilter<"Review"> | string
    partnerPropertyId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    reviewText?: StringFilter<"Review"> | string
    isPublished?: BoolFilter<"Review"> | boolean
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
    customer?: XOR<CustomerRelationFilter, CustomerWhereInput>
    partnerProperty?: XOR<PartnerPropertyRelationFilter, PartnerPropertyWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    customerId?: SortOrder
    partnerPropertyId?: SortOrder
    rating?: SortOrder
    reviewText?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    booking?: BookingOrderByWithRelationInput
    customer?: CustomerOrderByWithRelationInput
    partnerProperty?: PartnerPropertyOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingId?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    customerId?: StringFilter<"Review"> | string
    partnerPropertyId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    reviewText?: StringFilter<"Review"> | string
    isPublished?: BoolFilter<"Review"> | boolean
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    booking?: XOR<BookingRelationFilter, BookingWhereInput>
    customer?: XOR<CustomerRelationFilter, CustomerWhereInput>
    partnerProperty?: XOR<PartnerPropertyRelationFilter, PartnerPropertyWhereInput>
  }, "id" | "bookingId">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    customerId?: SortOrder
    partnerPropertyId?: SortOrder
    rating?: SortOrder
    reviewText?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    bookingId?: StringWithAggregatesFilter<"Review"> | string
    customerId?: StringWithAggregatesFilter<"Review"> | string
    partnerPropertyId?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    reviewText?: StringWithAggregatesFilter<"Review"> | string
    isPublished?: BoolWithAggregatesFilter<"Review"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type SecurityAuditLogWhereInput = {
    AND?: SecurityAuditLogWhereInput | SecurityAuditLogWhereInput[]
    OR?: SecurityAuditLogWhereInput[]
    NOT?: SecurityAuditLogWhereInput | SecurityAuditLogWhereInput[]
    id?: StringFilter<"SecurityAuditLog"> | string
    adminUserId?: StringFilter<"SecurityAuditLog"> | string
    action?: StringFilter<"SecurityAuditLog"> | string
    resourceType?: StringFilter<"SecurityAuditLog"> | string
    resourceId?: StringFilter<"SecurityAuditLog"> | string
    reason?: StringFilter<"SecurityAuditLog"> | string
    ipAddress?: StringFilter<"SecurityAuditLog"> | string
    createdAt?: DateTimeFilter<"SecurityAuditLog"> | Date | string
    adminUser?: XOR<AdminUserRelationFilter, AdminUserWhereInput>
  }

  export type SecurityAuditLogOrderByWithRelationInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    reason?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    adminUser?: AdminUserOrderByWithRelationInput
  }

  export type SecurityAuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SecurityAuditLogWhereInput | SecurityAuditLogWhereInput[]
    OR?: SecurityAuditLogWhereInput[]
    NOT?: SecurityAuditLogWhereInput | SecurityAuditLogWhereInput[]
    adminUserId?: StringFilter<"SecurityAuditLog"> | string
    action?: StringFilter<"SecurityAuditLog"> | string
    resourceType?: StringFilter<"SecurityAuditLog"> | string
    resourceId?: StringFilter<"SecurityAuditLog"> | string
    reason?: StringFilter<"SecurityAuditLog"> | string
    ipAddress?: StringFilter<"SecurityAuditLog"> | string
    createdAt?: DateTimeFilter<"SecurityAuditLog"> | Date | string
    adminUser?: XOR<AdminUserRelationFilter, AdminUserWhereInput>
  }, "id">

  export type SecurityAuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    reason?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    _count?: SecurityAuditLogCountOrderByAggregateInput
    _max?: SecurityAuditLogMaxOrderByAggregateInput
    _min?: SecurityAuditLogMinOrderByAggregateInput
  }

  export type SecurityAuditLogScalarWhereWithAggregatesInput = {
    AND?: SecurityAuditLogScalarWhereWithAggregatesInput | SecurityAuditLogScalarWhereWithAggregatesInput[]
    OR?: SecurityAuditLogScalarWhereWithAggregatesInput[]
    NOT?: SecurityAuditLogScalarWhereWithAggregatesInput | SecurityAuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SecurityAuditLog"> | string
    adminUserId?: StringWithAggregatesFilter<"SecurityAuditLog"> | string
    action?: StringWithAggregatesFilter<"SecurityAuditLog"> | string
    resourceType?: StringWithAggregatesFilter<"SecurityAuditLog"> | string
    resourceId?: StringWithAggregatesFilter<"SecurityAuditLog"> | string
    reason?: StringWithAggregatesFilter<"SecurityAuditLog"> | string
    ipAddress?: StringWithAggregatesFilter<"SecurityAuditLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SecurityAuditLog"> | Date | string
  }

  export type CustomerCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    phoneNumber: string
    isVerified?: boolean
    verificationToken?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutCustomerInput
    reviews?: ReviewCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    phoneNumber: string
    isVerified?: boolean
    verificationToken?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutCustomerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutCustomerNestedInput
    reviews?: ReviewUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutCustomerNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    phoneNumber: string
    isVerified?: boolean
    verificationToken?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: SecurityAuditLogCreateNestedManyWithoutAdminUserInput
  }

  export type AdminUserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: SecurityAuditLogUncheckedCreateNestedManyWithoutAdminUserInput
  }

  export type AdminUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: SecurityAuditLogUpdateManyWithoutAdminUserNestedInput
  }

  export type AdminUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: SecurityAuditLogUncheckedUpdateManyWithoutAdminUserNestedInput
  }

  export type AdminUserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerPropertyCreateInput = {
    id?: string
    kmPropertyId: string
    ownerName: string
    ownerPhone: string
    ownerWhatsapp: string
    name: string
    slug: string
    address: string
    city: string
    district: string
    latitude?: number | null
    longitude?: number | null
    description?: string | null
    genderType?: string
    generalFacilities: string
    photos: string
    termsAndRules?: string | null
    requirementsSchema: string
    paymentBankName: string
    paymentAccountNumber: string
    paymentAccountHolder: string
    paymentQrisUrl?: string | null
    partnershipStatus?: string
    rejectionReason?: string | null
    avgRating?: number
    totalReviews?: number
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: PartnerRoomCreateNestedManyWithoutPartnerPropertyInput
    bookings?: BookingCreateNestedManyWithoutPartnerPropertyInput
    reviews?: ReviewCreateNestedManyWithoutPartnerPropertyInput
  }

  export type PartnerPropertyUncheckedCreateInput = {
    id?: string
    kmPropertyId: string
    ownerName: string
    ownerPhone: string
    ownerWhatsapp: string
    name: string
    slug: string
    address: string
    city: string
    district: string
    latitude?: number | null
    longitude?: number | null
    description?: string | null
    genderType?: string
    generalFacilities: string
    photos: string
    termsAndRules?: string | null
    requirementsSchema: string
    paymentBankName: string
    paymentAccountNumber: string
    paymentAccountHolder: string
    paymentQrisUrl?: string | null
    partnershipStatus?: string
    rejectionReason?: string | null
    avgRating?: number
    totalReviews?: number
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: PartnerRoomUncheckedCreateNestedManyWithoutPartnerPropertyInput
    bookings?: BookingUncheckedCreateNestedManyWithoutPartnerPropertyInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutPartnerPropertyInput
  }

  export type PartnerPropertyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmPropertyId?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    ownerWhatsapp?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    genderType?: StringFieldUpdateOperationsInput | string
    generalFacilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    termsAndRules?: NullableStringFieldUpdateOperationsInput | string | null
    requirementsSchema?: StringFieldUpdateOperationsInput | string
    paymentBankName?: StringFieldUpdateOperationsInput | string
    paymentAccountNumber?: StringFieldUpdateOperationsInput | string
    paymentAccountHolder?: StringFieldUpdateOperationsInput | string
    paymentQrisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnershipStatus?: StringFieldUpdateOperationsInput | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: PartnerRoomUpdateManyWithoutPartnerPropertyNestedInput
    bookings?: BookingUpdateManyWithoutPartnerPropertyNestedInput
    reviews?: ReviewUpdateManyWithoutPartnerPropertyNestedInput
  }

  export type PartnerPropertyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmPropertyId?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    ownerWhatsapp?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    genderType?: StringFieldUpdateOperationsInput | string
    generalFacilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    termsAndRules?: NullableStringFieldUpdateOperationsInput | string | null
    requirementsSchema?: StringFieldUpdateOperationsInput | string
    paymentBankName?: StringFieldUpdateOperationsInput | string
    paymentAccountNumber?: StringFieldUpdateOperationsInput | string
    paymentAccountHolder?: StringFieldUpdateOperationsInput | string
    paymentQrisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnershipStatus?: StringFieldUpdateOperationsInput | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: PartnerRoomUncheckedUpdateManyWithoutPartnerPropertyNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutPartnerPropertyNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutPartnerPropertyNestedInput
  }

  export type PartnerPropertyCreateManyInput = {
    id?: string
    kmPropertyId: string
    ownerName: string
    ownerPhone: string
    ownerWhatsapp: string
    name: string
    slug: string
    address: string
    city: string
    district: string
    latitude?: number | null
    longitude?: number | null
    description?: string | null
    genderType?: string
    generalFacilities: string
    photos: string
    termsAndRules?: string | null
    requirementsSchema: string
    paymentBankName: string
    paymentAccountNumber: string
    paymentAccountHolder: string
    paymentQrisUrl?: string | null
    partnershipStatus?: string
    rejectionReason?: string | null
    avgRating?: number
    totalReviews?: number
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerPropertyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmPropertyId?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    ownerWhatsapp?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    genderType?: StringFieldUpdateOperationsInput | string
    generalFacilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    termsAndRules?: NullableStringFieldUpdateOperationsInput | string | null
    requirementsSchema?: StringFieldUpdateOperationsInput | string
    paymentBankName?: StringFieldUpdateOperationsInput | string
    paymentAccountNumber?: StringFieldUpdateOperationsInput | string
    paymentAccountHolder?: StringFieldUpdateOperationsInput | string
    paymentQrisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnershipStatus?: StringFieldUpdateOperationsInput | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerPropertyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmPropertyId?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    ownerWhatsapp?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    genderType?: StringFieldUpdateOperationsInput | string
    generalFacilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    termsAndRules?: NullableStringFieldUpdateOperationsInput | string | null
    requirementsSchema?: StringFieldUpdateOperationsInput | string
    paymentBankName?: StringFieldUpdateOperationsInput | string
    paymentAccountNumber?: StringFieldUpdateOperationsInput | string
    paymentAccountHolder?: StringFieldUpdateOperationsInput | string
    paymentQrisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnershipStatus?: StringFieldUpdateOperationsInput | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerRoomCreateInput = {
    id?: string
    kmRoomId: string
    roomNumber: string
    roomType?: string
    sizeSqm?: number | null
    facilities: string
    photos: string
    monthlyPrice: number
    totalCapacity: number
    occupiedSlots?: number
    reservedSlots?: number
    status?: string
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    partnerProperty: PartnerPropertyCreateNestedOneWithoutRoomsInput
    bookings?: BookingCreateNestedManyWithoutPartnerRoomInput
  }

  export type PartnerRoomUncheckedCreateInput = {
    id?: string
    kmRoomId: string
    partnerPropertyId: string
    roomNumber: string
    roomType?: string
    sizeSqm?: number | null
    facilities: string
    photos: string
    monthlyPrice: number
    totalCapacity: number
    occupiedSlots?: number
    reservedSlots?: number
    status?: string
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutPartnerRoomInput
  }

  export type PartnerRoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmRoomId?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    roomType?: StringFieldUpdateOperationsInput | string
    sizeSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    facilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: FloatFieldUpdateOperationsInput | number
    totalCapacity?: IntFieldUpdateOperationsInput | number
    occupiedSlots?: IntFieldUpdateOperationsInput | number
    reservedSlots?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    partnerProperty?: PartnerPropertyUpdateOneRequiredWithoutRoomsNestedInput
    bookings?: BookingUpdateManyWithoutPartnerRoomNestedInput
  }

  export type PartnerRoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmRoomId?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    roomType?: StringFieldUpdateOperationsInput | string
    sizeSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    facilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: FloatFieldUpdateOperationsInput | number
    totalCapacity?: IntFieldUpdateOperationsInput | number
    occupiedSlots?: IntFieldUpdateOperationsInput | number
    reservedSlots?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutPartnerRoomNestedInput
  }

  export type PartnerRoomCreateManyInput = {
    id?: string
    kmRoomId: string
    partnerPropertyId: string
    roomNumber: string
    roomType?: string
    sizeSqm?: number | null
    facilities: string
    photos: string
    monthlyPrice: number
    totalCapacity: number
    occupiedSlots?: number
    reservedSlots?: number
    status?: string
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerRoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmRoomId?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    roomType?: StringFieldUpdateOperationsInput | string
    sizeSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    facilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: FloatFieldUpdateOperationsInput | number
    totalCapacity?: IntFieldUpdateOperationsInput | number
    occupiedSlots?: IntFieldUpdateOperationsInput | number
    reservedSlots?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerRoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmRoomId?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    roomType?: StringFieldUpdateOperationsInput | string
    sizeSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    facilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: FloatFieldUpdateOperationsInput | number
    totalCapacity?: IntFieldUpdateOperationsInput | number
    occupiedSlots?: IntFieldUpdateOperationsInput | number
    reservedSlots?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateInput = {
    id?: string
    bookingCode: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutBookingsInput
    partnerProperty: PartnerPropertyCreateNestedOneWithoutBookingsInput
    partnerRoom: PartnerRoomCreateNestedOneWithoutBookingsInput
    paymentSubmission?: PaymentSubmissionCreateNestedOneWithoutBookingInput
    refundRequest?: RefundRequestCreateNestedOneWithoutBookingInput
    review?: ReviewCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateInput = {
    id?: string
    bookingCode: string
    customerId: string
    partnerPropertyId: string
    partnerRoomId: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentSubmission?: PaymentSubmissionUncheckedCreateNestedOneWithoutBookingInput
    refundRequest?: RefundRequestUncheckedCreateNestedOneWithoutBookingInput
    review?: ReviewUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutBookingsNestedInput
    partnerProperty?: PartnerPropertyUpdateOneRequiredWithoutBookingsNestedInput
    partnerRoom?: PartnerRoomUpdateOneRequiredWithoutBookingsNestedInput
    paymentSubmission?: PaymentSubmissionUpdateOneWithoutBookingNestedInput
    refundRequest?: RefundRequestUpdateOneWithoutBookingNestedInput
    review?: ReviewUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    partnerRoomId?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentSubmission?: PaymentSubmissionUncheckedUpdateOneWithoutBookingNestedInput
    refundRequest?: RefundRequestUncheckedUpdateOneWithoutBookingNestedInput
    review?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingCreateManyInput = {
    id?: string
    bookingCode: string
    customerId: string
    partnerPropertyId: string
    partnerRoomId: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    partnerRoomId?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentSubmissionCreateInput = {
    id?: string
    transferReceiptUrl: string
    senderBankName?: string | null
    senderAccountHolder?: string | null
    submissionNotes?: string | null
    submittedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    booking: BookingCreateNestedOneWithoutPaymentSubmissionInput
  }

  export type PaymentSubmissionUncheckedCreateInput = {
    id?: string
    bookingId: string
    transferReceiptUrl: string
    senderBankName?: string | null
    senderAccountHolder?: string | null
    submissionNotes?: string | null
    submittedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentSubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transferReceiptUrl?: StringFieldUpdateOperationsInput | string
    senderBankName?: NullableStringFieldUpdateOperationsInput | string | null
    senderAccountHolder?: NullableStringFieldUpdateOperationsInput | string | null
    submissionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutPaymentSubmissionNestedInput
  }

  export type PaymentSubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    transferReceiptUrl?: StringFieldUpdateOperationsInput | string
    senderBankName?: NullableStringFieldUpdateOperationsInput | string | null
    senderAccountHolder?: NullableStringFieldUpdateOperationsInput | string | null
    submissionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentSubmissionCreateManyInput = {
    id?: string
    bookingId: string
    transferReceiptUrl: string
    senderBankName?: string | null
    senderAccountHolder?: string | null
    submissionNotes?: string | null
    submittedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentSubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    transferReceiptUrl?: StringFieldUpdateOperationsInput | string
    senderBankName?: NullableStringFieldUpdateOperationsInput | string | null
    senderAccountHolder?: NullableStringFieldUpdateOperationsInput | string | null
    submissionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentSubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    transferReceiptUrl?: StringFieldUpdateOperationsInput | string
    senderBankName?: NullableStringFieldUpdateOperationsInput | string | null
    senderAccountHolder?: NullableStringFieldUpdateOperationsInput | string | null
    submissionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundRequestCreateInput = {
    id?: string
    bankName: string
    accountNumber: string
    accountHolder: string
    refundAmount: number
    penaltyDeduction?: number
    status?: string
    requestedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    booking: BookingCreateNestedOneWithoutRefundRequestInput
  }

  export type RefundRequestUncheckedCreateInput = {
    id?: string
    bookingId: string
    bankName: string
    accountNumber: string
    accountHolder: string
    refundAmount: number
    penaltyDeduction?: number
    status?: string
    requestedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefundRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    accountHolder?: StringFieldUpdateOperationsInput | string
    refundAmount?: FloatFieldUpdateOperationsInput | number
    penaltyDeduction?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutRefundRequestNestedInput
  }

  export type RefundRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    accountHolder?: StringFieldUpdateOperationsInput | string
    refundAmount?: FloatFieldUpdateOperationsInput | number
    penaltyDeduction?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundRequestCreateManyInput = {
    id?: string
    bookingId: string
    bankName: string
    accountNumber: string
    accountHolder: string
    refundAmount: number
    penaltyDeduction?: number
    status?: string
    requestedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefundRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    accountHolder?: StringFieldUpdateOperationsInput | string
    refundAmount?: FloatFieldUpdateOperationsInput | number
    penaltyDeduction?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    accountHolder?: StringFieldUpdateOperationsInput | string
    refundAmount?: FloatFieldUpdateOperationsInput | number
    penaltyDeduction?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateInput = {
    id?: string
    rating: number
    reviewText: string
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    booking: BookingCreateNestedOneWithoutReviewInput
    customer: CustomerCreateNestedOneWithoutReviewsInput
    partnerProperty: PartnerPropertyCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    bookingId: string
    customerId: string
    partnerPropertyId: string
    rating: number
    reviewText: string
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    reviewText?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutReviewNestedInput
    customer?: CustomerUpdateOneRequiredWithoutReviewsNestedInput
    partnerProperty?: PartnerPropertyUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    reviewText?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    bookingId: string
    customerId: string
    partnerPropertyId: string
    rating: number
    reviewText: string
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    reviewText?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    reviewText?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityAuditLogCreateInput = {
    id?: string
    action: string
    resourceType: string
    resourceId: string
    reason: string
    ipAddress: string
    createdAt?: Date | string
    adminUser: AdminUserCreateNestedOneWithoutAuditLogsInput
  }

  export type SecurityAuditLogUncheckedCreateInput = {
    id?: string
    adminUserId: string
    action: string
    resourceType: string
    resourceId: string
    reason: string
    ipAddress: string
    createdAt?: Date | string
  }

  export type SecurityAuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUser?: AdminUserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type SecurityAuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityAuditLogCreateManyInput = {
    id?: string
    adminUserId: string
    action: string
    resourceType: string
    resourceId: string
    reason: string
    ipAddress: string
    createdAt?: Date | string
  }

  export type SecurityAuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityAuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrder
    isVerified?: SortOrder
    verificationToken?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrder
    isVerified?: SortOrder
    verificationToken?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrder
    isVerified?: SortOrder
    verificationToken?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type SecurityAuditLogListRelationFilter = {
    every?: SecurityAuditLogWhereInput
    some?: SecurityAuditLogWhereInput
    none?: SecurityAuditLogWhereInput
  }

  export type SecurityAuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdminUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PartnerRoomListRelationFilter = {
    every?: PartnerRoomWhereInput
    some?: PartnerRoomWhereInput
    none?: PartnerRoomWhereInput
  }

  export type PartnerRoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PartnerPropertyCountOrderByAggregateInput = {
    id?: SortOrder
    kmPropertyId?: SortOrder
    ownerName?: SortOrder
    ownerPhone?: SortOrder
    ownerWhatsapp?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    address?: SortOrder
    city?: SortOrder
    district?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    description?: SortOrder
    genderType?: SortOrder
    generalFacilities?: SortOrder
    photos?: SortOrder
    termsAndRules?: SortOrder
    requirementsSchema?: SortOrder
    paymentBankName?: SortOrder
    paymentAccountNumber?: SortOrder
    paymentAccountHolder?: SortOrder
    paymentQrisUrl?: SortOrder
    partnershipStatus?: SortOrder
    rejectionReason?: SortOrder
    avgRating?: SortOrder
    totalReviews?: SortOrder
    lastSyncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerPropertyAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    avgRating?: SortOrder
    totalReviews?: SortOrder
  }

  export type PartnerPropertyMaxOrderByAggregateInput = {
    id?: SortOrder
    kmPropertyId?: SortOrder
    ownerName?: SortOrder
    ownerPhone?: SortOrder
    ownerWhatsapp?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    address?: SortOrder
    city?: SortOrder
    district?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    description?: SortOrder
    genderType?: SortOrder
    generalFacilities?: SortOrder
    photos?: SortOrder
    termsAndRules?: SortOrder
    requirementsSchema?: SortOrder
    paymentBankName?: SortOrder
    paymentAccountNumber?: SortOrder
    paymentAccountHolder?: SortOrder
    paymentQrisUrl?: SortOrder
    partnershipStatus?: SortOrder
    rejectionReason?: SortOrder
    avgRating?: SortOrder
    totalReviews?: SortOrder
    lastSyncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerPropertyMinOrderByAggregateInput = {
    id?: SortOrder
    kmPropertyId?: SortOrder
    ownerName?: SortOrder
    ownerPhone?: SortOrder
    ownerWhatsapp?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    address?: SortOrder
    city?: SortOrder
    district?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    description?: SortOrder
    genderType?: SortOrder
    generalFacilities?: SortOrder
    photos?: SortOrder
    termsAndRules?: SortOrder
    requirementsSchema?: SortOrder
    paymentBankName?: SortOrder
    paymentAccountNumber?: SortOrder
    paymentAccountHolder?: SortOrder
    paymentQrisUrl?: SortOrder
    partnershipStatus?: SortOrder
    rejectionReason?: SortOrder
    avgRating?: SortOrder
    totalReviews?: SortOrder
    lastSyncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerPropertySumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    avgRating?: SortOrder
    totalReviews?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PartnerPropertyRelationFilter = {
    is?: PartnerPropertyWhereInput
    isNot?: PartnerPropertyWhereInput
  }

  export type PartnerRoomCountOrderByAggregateInput = {
    id?: SortOrder
    kmRoomId?: SortOrder
    partnerPropertyId?: SortOrder
    roomNumber?: SortOrder
    roomType?: SortOrder
    sizeSqm?: SortOrder
    facilities?: SortOrder
    photos?: SortOrder
    monthlyPrice?: SortOrder
    totalCapacity?: SortOrder
    occupiedSlots?: SortOrder
    reservedSlots?: SortOrder
    status?: SortOrder
    lastSyncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerRoomAvgOrderByAggregateInput = {
    sizeSqm?: SortOrder
    monthlyPrice?: SortOrder
    totalCapacity?: SortOrder
    occupiedSlots?: SortOrder
    reservedSlots?: SortOrder
  }

  export type PartnerRoomMaxOrderByAggregateInput = {
    id?: SortOrder
    kmRoomId?: SortOrder
    partnerPropertyId?: SortOrder
    roomNumber?: SortOrder
    roomType?: SortOrder
    sizeSqm?: SortOrder
    facilities?: SortOrder
    photos?: SortOrder
    monthlyPrice?: SortOrder
    totalCapacity?: SortOrder
    occupiedSlots?: SortOrder
    reservedSlots?: SortOrder
    status?: SortOrder
    lastSyncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerRoomMinOrderByAggregateInput = {
    id?: SortOrder
    kmRoomId?: SortOrder
    partnerPropertyId?: SortOrder
    roomNumber?: SortOrder
    roomType?: SortOrder
    sizeSqm?: SortOrder
    facilities?: SortOrder
    photos?: SortOrder
    monthlyPrice?: SortOrder
    totalCapacity?: SortOrder
    occupiedSlots?: SortOrder
    reservedSlots?: SortOrder
    status?: SortOrder
    lastSyncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerRoomSumOrderByAggregateInput = {
    sizeSqm?: SortOrder
    monthlyPrice?: SortOrder
    totalCapacity?: SortOrder
    occupiedSlots?: SortOrder
    reservedSlots?: SortOrder
  }

  export type CustomerRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type PartnerRoomRelationFilter = {
    is?: PartnerRoomWhereInput
    isNot?: PartnerRoomWhereInput
  }

  export type PaymentSubmissionNullableRelationFilter = {
    is?: PaymentSubmissionWhereInput | null
    isNot?: PaymentSubmissionWhereInput | null
  }

  export type RefundRequestNullableRelationFilter = {
    is?: RefundRequestWhereInput | null
    isNot?: RefundRequestWhereInput | null
  }

  export type ReviewNullableRelationFilter = {
    is?: ReviewWhereInput | null
    isNot?: ReviewWhereInput | null
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    bookingCode?: SortOrder
    customerId?: SortOrder
    partnerPropertyId?: SortOrder
    partnerRoomId?: SortOrder
    slotsCount?: SortOrder
    durationMonths?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    pricePerSlot?: SortOrder
    totalAmount?: SortOrder
    occupantsData?: SortOrder
    status?: SortOrder
    cancellationReason?: SortOrder
    paymentDeadline?: SortOrder
    verificationDeadline?: SortOrder
    checkInDeadline?: SortOrder
    isNeedsAttention?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingAvgOrderByAggregateInput = {
    slotsCount?: SortOrder
    durationMonths?: SortOrder
    pricePerSlot?: SortOrder
    totalAmount?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingCode?: SortOrder
    customerId?: SortOrder
    partnerPropertyId?: SortOrder
    partnerRoomId?: SortOrder
    slotsCount?: SortOrder
    durationMonths?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    pricePerSlot?: SortOrder
    totalAmount?: SortOrder
    occupantsData?: SortOrder
    status?: SortOrder
    cancellationReason?: SortOrder
    paymentDeadline?: SortOrder
    verificationDeadline?: SortOrder
    checkInDeadline?: SortOrder
    isNeedsAttention?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    bookingCode?: SortOrder
    customerId?: SortOrder
    partnerPropertyId?: SortOrder
    partnerRoomId?: SortOrder
    slotsCount?: SortOrder
    durationMonths?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    pricePerSlot?: SortOrder
    totalAmount?: SortOrder
    occupantsData?: SortOrder
    status?: SortOrder
    cancellationReason?: SortOrder
    paymentDeadline?: SortOrder
    verificationDeadline?: SortOrder
    checkInDeadline?: SortOrder
    isNeedsAttention?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingSumOrderByAggregateInput = {
    slotsCount?: SortOrder
    durationMonths?: SortOrder
    pricePerSlot?: SortOrder
    totalAmount?: SortOrder
  }

  export type BookingRelationFilter = {
    is?: BookingWhereInput
    isNot?: BookingWhereInput
  }

  export type PaymentSubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    transferReceiptUrl?: SortOrder
    senderBankName?: SortOrder
    senderAccountHolder?: SortOrder
    submissionNotes?: SortOrder
    submittedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    transferReceiptUrl?: SortOrder
    senderBankName?: SortOrder
    senderAccountHolder?: SortOrder
    submissionNotes?: SortOrder
    submittedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    transferReceiptUrl?: SortOrder
    senderBankName?: SortOrder
    senderAccountHolder?: SortOrder
    submissionNotes?: SortOrder
    submittedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RefundRequestCountOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    bankName?: SortOrder
    accountNumber?: SortOrder
    accountHolder?: SortOrder
    refundAmount?: SortOrder
    penaltyDeduction?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RefundRequestAvgOrderByAggregateInput = {
    refundAmount?: SortOrder
    penaltyDeduction?: SortOrder
  }

  export type RefundRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    bankName?: SortOrder
    accountNumber?: SortOrder
    accountHolder?: SortOrder
    refundAmount?: SortOrder
    penaltyDeduction?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RefundRequestMinOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    bankName?: SortOrder
    accountNumber?: SortOrder
    accountHolder?: SortOrder
    refundAmount?: SortOrder
    penaltyDeduction?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RefundRequestSumOrderByAggregateInput = {
    refundAmount?: SortOrder
    penaltyDeduction?: SortOrder
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    customerId?: SortOrder
    partnerPropertyId?: SortOrder
    rating?: SortOrder
    reviewText?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    customerId?: SortOrder
    partnerPropertyId?: SortOrder
    rating?: SortOrder
    reviewText?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    customerId?: SortOrder
    partnerPropertyId?: SortOrder
    rating?: SortOrder
    reviewText?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type AdminUserRelationFilter = {
    is?: AdminUserWhereInput
    isNot?: AdminUserWhereInput
  }

  export type SecurityAuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    reason?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type SecurityAuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    reason?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type SecurityAuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    reason?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type BookingCreateNestedManyWithoutCustomerInput = {
    create?: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput> | BookingCreateWithoutCustomerInput[] | BookingUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCustomerInput | BookingCreateOrConnectWithoutCustomerInput[]
    createMany?: BookingCreateManyCustomerInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutCustomerInput = {
    create?: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput> | ReviewCreateWithoutCustomerInput[] | ReviewUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutCustomerInput | ReviewCreateOrConnectWithoutCustomerInput[]
    createMany?: ReviewCreateManyCustomerInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput> | BookingCreateWithoutCustomerInput[] | BookingUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCustomerInput | BookingCreateOrConnectWithoutCustomerInput[]
    createMany?: BookingCreateManyCustomerInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput> | ReviewCreateWithoutCustomerInput[] | ReviewUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutCustomerInput | ReviewCreateOrConnectWithoutCustomerInput[]
    createMany?: ReviewCreateManyCustomerInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BookingUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput> | BookingCreateWithoutCustomerInput[] | BookingUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCustomerInput | BookingCreateOrConnectWithoutCustomerInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutCustomerInput | BookingUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: BookingCreateManyCustomerInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutCustomerInput | BookingUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutCustomerInput | BookingUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput> | ReviewCreateWithoutCustomerInput[] | ReviewUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutCustomerInput | ReviewCreateOrConnectWithoutCustomerInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutCustomerInput | ReviewUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: ReviewCreateManyCustomerInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutCustomerInput | ReviewUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutCustomerInput | ReviewUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput> | BookingCreateWithoutCustomerInput[] | BookingUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCustomerInput | BookingCreateOrConnectWithoutCustomerInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutCustomerInput | BookingUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: BookingCreateManyCustomerInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutCustomerInput | BookingUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutCustomerInput | BookingUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput> | ReviewCreateWithoutCustomerInput[] | ReviewUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutCustomerInput | ReviewCreateOrConnectWithoutCustomerInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutCustomerInput | ReviewUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: ReviewCreateManyCustomerInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutCustomerInput | ReviewUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutCustomerInput | ReviewUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type SecurityAuditLogCreateNestedManyWithoutAdminUserInput = {
    create?: XOR<SecurityAuditLogCreateWithoutAdminUserInput, SecurityAuditLogUncheckedCreateWithoutAdminUserInput> | SecurityAuditLogCreateWithoutAdminUserInput[] | SecurityAuditLogUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: SecurityAuditLogCreateOrConnectWithoutAdminUserInput | SecurityAuditLogCreateOrConnectWithoutAdminUserInput[]
    createMany?: SecurityAuditLogCreateManyAdminUserInputEnvelope
    connect?: SecurityAuditLogWhereUniqueInput | SecurityAuditLogWhereUniqueInput[]
  }

  export type SecurityAuditLogUncheckedCreateNestedManyWithoutAdminUserInput = {
    create?: XOR<SecurityAuditLogCreateWithoutAdminUserInput, SecurityAuditLogUncheckedCreateWithoutAdminUserInput> | SecurityAuditLogCreateWithoutAdminUserInput[] | SecurityAuditLogUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: SecurityAuditLogCreateOrConnectWithoutAdminUserInput | SecurityAuditLogCreateOrConnectWithoutAdminUserInput[]
    createMany?: SecurityAuditLogCreateManyAdminUserInputEnvelope
    connect?: SecurityAuditLogWhereUniqueInput | SecurityAuditLogWhereUniqueInput[]
  }

  export type SecurityAuditLogUpdateManyWithoutAdminUserNestedInput = {
    create?: XOR<SecurityAuditLogCreateWithoutAdminUserInput, SecurityAuditLogUncheckedCreateWithoutAdminUserInput> | SecurityAuditLogCreateWithoutAdminUserInput[] | SecurityAuditLogUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: SecurityAuditLogCreateOrConnectWithoutAdminUserInput | SecurityAuditLogCreateOrConnectWithoutAdminUserInput[]
    upsert?: SecurityAuditLogUpsertWithWhereUniqueWithoutAdminUserInput | SecurityAuditLogUpsertWithWhereUniqueWithoutAdminUserInput[]
    createMany?: SecurityAuditLogCreateManyAdminUserInputEnvelope
    set?: SecurityAuditLogWhereUniqueInput | SecurityAuditLogWhereUniqueInput[]
    disconnect?: SecurityAuditLogWhereUniqueInput | SecurityAuditLogWhereUniqueInput[]
    delete?: SecurityAuditLogWhereUniqueInput | SecurityAuditLogWhereUniqueInput[]
    connect?: SecurityAuditLogWhereUniqueInput | SecurityAuditLogWhereUniqueInput[]
    update?: SecurityAuditLogUpdateWithWhereUniqueWithoutAdminUserInput | SecurityAuditLogUpdateWithWhereUniqueWithoutAdminUserInput[]
    updateMany?: SecurityAuditLogUpdateManyWithWhereWithoutAdminUserInput | SecurityAuditLogUpdateManyWithWhereWithoutAdminUserInput[]
    deleteMany?: SecurityAuditLogScalarWhereInput | SecurityAuditLogScalarWhereInput[]
  }

  export type SecurityAuditLogUncheckedUpdateManyWithoutAdminUserNestedInput = {
    create?: XOR<SecurityAuditLogCreateWithoutAdminUserInput, SecurityAuditLogUncheckedCreateWithoutAdminUserInput> | SecurityAuditLogCreateWithoutAdminUserInput[] | SecurityAuditLogUncheckedCreateWithoutAdminUserInput[]
    connectOrCreate?: SecurityAuditLogCreateOrConnectWithoutAdminUserInput | SecurityAuditLogCreateOrConnectWithoutAdminUserInput[]
    upsert?: SecurityAuditLogUpsertWithWhereUniqueWithoutAdminUserInput | SecurityAuditLogUpsertWithWhereUniqueWithoutAdminUserInput[]
    createMany?: SecurityAuditLogCreateManyAdminUserInputEnvelope
    set?: SecurityAuditLogWhereUniqueInput | SecurityAuditLogWhereUniqueInput[]
    disconnect?: SecurityAuditLogWhereUniqueInput | SecurityAuditLogWhereUniqueInput[]
    delete?: SecurityAuditLogWhereUniqueInput | SecurityAuditLogWhereUniqueInput[]
    connect?: SecurityAuditLogWhereUniqueInput | SecurityAuditLogWhereUniqueInput[]
    update?: SecurityAuditLogUpdateWithWhereUniqueWithoutAdminUserInput | SecurityAuditLogUpdateWithWhereUniqueWithoutAdminUserInput[]
    updateMany?: SecurityAuditLogUpdateManyWithWhereWithoutAdminUserInput | SecurityAuditLogUpdateManyWithWhereWithoutAdminUserInput[]
    deleteMany?: SecurityAuditLogScalarWhereInput | SecurityAuditLogScalarWhereInput[]
  }

  export type PartnerRoomCreateNestedManyWithoutPartnerPropertyInput = {
    create?: XOR<PartnerRoomCreateWithoutPartnerPropertyInput, PartnerRoomUncheckedCreateWithoutPartnerPropertyInput> | PartnerRoomCreateWithoutPartnerPropertyInput[] | PartnerRoomUncheckedCreateWithoutPartnerPropertyInput[]
    connectOrCreate?: PartnerRoomCreateOrConnectWithoutPartnerPropertyInput | PartnerRoomCreateOrConnectWithoutPartnerPropertyInput[]
    createMany?: PartnerRoomCreateManyPartnerPropertyInputEnvelope
    connect?: PartnerRoomWhereUniqueInput | PartnerRoomWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutPartnerPropertyInput = {
    create?: XOR<BookingCreateWithoutPartnerPropertyInput, BookingUncheckedCreateWithoutPartnerPropertyInput> | BookingCreateWithoutPartnerPropertyInput[] | BookingUncheckedCreateWithoutPartnerPropertyInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutPartnerPropertyInput | BookingCreateOrConnectWithoutPartnerPropertyInput[]
    createMany?: BookingCreateManyPartnerPropertyInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutPartnerPropertyInput = {
    create?: XOR<ReviewCreateWithoutPartnerPropertyInput, ReviewUncheckedCreateWithoutPartnerPropertyInput> | ReviewCreateWithoutPartnerPropertyInput[] | ReviewUncheckedCreateWithoutPartnerPropertyInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutPartnerPropertyInput | ReviewCreateOrConnectWithoutPartnerPropertyInput[]
    createMany?: ReviewCreateManyPartnerPropertyInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type PartnerRoomUncheckedCreateNestedManyWithoutPartnerPropertyInput = {
    create?: XOR<PartnerRoomCreateWithoutPartnerPropertyInput, PartnerRoomUncheckedCreateWithoutPartnerPropertyInput> | PartnerRoomCreateWithoutPartnerPropertyInput[] | PartnerRoomUncheckedCreateWithoutPartnerPropertyInput[]
    connectOrCreate?: PartnerRoomCreateOrConnectWithoutPartnerPropertyInput | PartnerRoomCreateOrConnectWithoutPartnerPropertyInput[]
    createMany?: PartnerRoomCreateManyPartnerPropertyInputEnvelope
    connect?: PartnerRoomWhereUniqueInput | PartnerRoomWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutPartnerPropertyInput = {
    create?: XOR<BookingCreateWithoutPartnerPropertyInput, BookingUncheckedCreateWithoutPartnerPropertyInput> | BookingCreateWithoutPartnerPropertyInput[] | BookingUncheckedCreateWithoutPartnerPropertyInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutPartnerPropertyInput | BookingCreateOrConnectWithoutPartnerPropertyInput[]
    createMany?: BookingCreateManyPartnerPropertyInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutPartnerPropertyInput = {
    create?: XOR<ReviewCreateWithoutPartnerPropertyInput, ReviewUncheckedCreateWithoutPartnerPropertyInput> | ReviewCreateWithoutPartnerPropertyInput[] | ReviewUncheckedCreateWithoutPartnerPropertyInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutPartnerPropertyInput | ReviewCreateOrConnectWithoutPartnerPropertyInput[]
    createMany?: ReviewCreateManyPartnerPropertyInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PartnerRoomUpdateManyWithoutPartnerPropertyNestedInput = {
    create?: XOR<PartnerRoomCreateWithoutPartnerPropertyInput, PartnerRoomUncheckedCreateWithoutPartnerPropertyInput> | PartnerRoomCreateWithoutPartnerPropertyInput[] | PartnerRoomUncheckedCreateWithoutPartnerPropertyInput[]
    connectOrCreate?: PartnerRoomCreateOrConnectWithoutPartnerPropertyInput | PartnerRoomCreateOrConnectWithoutPartnerPropertyInput[]
    upsert?: PartnerRoomUpsertWithWhereUniqueWithoutPartnerPropertyInput | PartnerRoomUpsertWithWhereUniqueWithoutPartnerPropertyInput[]
    createMany?: PartnerRoomCreateManyPartnerPropertyInputEnvelope
    set?: PartnerRoomWhereUniqueInput | PartnerRoomWhereUniqueInput[]
    disconnect?: PartnerRoomWhereUniqueInput | PartnerRoomWhereUniqueInput[]
    delete?: PartnerRoomWhereUniqueInput | PartnerRoomWhereUniqueInput[]
    connect?: PartnerRoomWhereUniqueInput | PartnerRoomWhereUniqueInput[]
    update?: PartnerRoomUpdateWithWhereUniqueWithoutPartnerPropertyInput | PartnerRoomUpdateWithWhereUniqueWithoutPartnerPropertyInput[]
    updateMany?: PartnerRoomUpdateManyWithWhereWithoutPartnerPropertyInput | PartnerRoomUpdateManyWithWhereWithoutPartnerPropertyInput[]
    deleteMany?: PartnerRoomScalarWhereInput | PartnerRoomScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutPartnerPropertyNestedInput = {
    create?: XOR<BookingCreateWithoutPartnerPropertyInput, BookingUncheckedCreateWithoutPartnerPropertyInput> | BookingCreateWithoutPartnerPropertyInput[] | BookingUncheckedCreateWithoutPartnerPropertyInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutPartnerPropertyInput | BookingCreateOrConnectWithoutPartnerPropertyInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutPartnerPropertyInput | BookingUpsertWithWhereUniqueWithoutPartnerPropertyInput[]
    createMany?: BookingCreateManyPartnerPropertyInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutPartnerPropertyInput | BookingUpdateWithWhereUniqueWithoutPartnerPropertyInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutPartnerPropertyInput | BookingUpdateManyWithWhereWithoutPartnerPropertyInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutPartnerPropertyNestedInput = {
    create?: XOR<ReviewCreateWithoutPartnerPropertyInput, ReviewUncheckedCreateWithoutPartnerPropertyInput> | ReviewCreateWithoutPartnerPropertyInput[] | ReviewUncheckedCreateWithoutPartnerPropertyInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutPartnerPropertyInput | ReviewCreateOrConnectWithoutPartnerPropertyInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutPartnerPropertyInput | ReviewUpsertWithWhereUniqueWithoutPartnerPropertyInput[]
    createMany?: ReviewCreateManyPartnerPropertyInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutPartnerPropertyInput | ReviewUpdateWithWhereUniqueWithoutPartnerPropertyInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutPartnerPropertyInput | ReviewUpdateManyWithWhereWithoutPartnerPropertyInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type PartnerRoomUncheckedUpdateManyWithoutPartnerPropertyNestedInput = {
    create?: XOR<PartnerRoomCreateWithoutPartnerPropertyInput, PartnerRoomUncheckedCreateWithoutPartnerPropertyInput> | PartnerRoomCreateWithoutPartnerPropertyInput[] | PartnerRoomUncheckedCreateWithoutPartnerPropertyInput[]
    connectOrCreate?: PartnerRoomCreateOrConnectWithoutPartnerPropertyInput | PartnerRoomCreateOrConnectWithoutPartnerPropertyInput[]
    upsert?: PartnerRoomUpsertWithWhereUniqueWithoutPartnerPropertyInput | PartnerRoomUpsertWithWhereUniqueWithoutPartnerPropertyInput[]
    createMany?: PartnerRoomCreateManyPartnerPropertyInputEnvelope
    set?: PartnerRoomWhereUniqueInput | PartnerRoomWhereUniqueInput[]
    disconnect?: PartnerRoomWhereUniqueInput | PartnerRoomWhereUniqueInput[]
    delete?: PartnerRoomWhereUniqueInput | PartnerRoomWhereUniqueInput[]
    connect?: PartnerRoomWhereUniqueInput | PartnerRoomWhereUniqueInput[]
    update?: PartnerRoomUpdateWithWhereUniqueWithoutPartnerPropertyInput | PartnerRoomUpdateWithWhereUniqueWithoutPartnerPropertyInput[]
    updateMany?: PartnerRoomUpdateManyWithWhereWithoutPartnerPropertyInput | PartnerRoomUpdateManyWithWhereWithoutPartnerPropertyInput[]
    deleteMany?: PartnerRoomScalarWhereInput | PartnerRoomScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutPartnerPropertyNestedInput = {
    create?: XOR<BookingCreateWithoutPartnerPropertyInput, BookingUncheckedCreateWithoutPartnerPropertyInput> | BookingCreateWithoutPartnerPropertyInput[] | BookingUncheckedCreateWithoutPartnerPropertyInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutPartnerPropertyInput | BookingCreateOrConnectWithoutPartnerPropertyInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutPartnerPropertyInput | BookingUpsertWithWhereUniqueWithoutPartnerPropertyInput[]
    createMany?: BookingCreateManyPartnerPropertyInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutPartnerPropertyInput | BookingUpdateWithWhereUniqueWithoutPartnerPropertyInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutPartnerPropertyInput | BookingUpdateManyWithWhereWithoutPartnerPropertyInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutPartnerPropertyNestedInput = {
    create?: XOR<ReviewCreateWithoutPartnerPropertyInput, ReviewUncheckedCreateWithoutPartnerPropertyInput> | ReviewCreateWithoutPartnerPropertyInput[] | ReviewUncheckedCreateWithoutPartnerPropertyInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutPartnerPropertyInput | ReviewCreateOrConnectWithoutPartnerPropertyInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutPartnerPropertyInput | ReviewUpsertWithWhereUniqueWithoutPartnerPropertyInput[]
    createMany?: ReviewCreateManyPartnerPropertyInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutPartnerPropertyInput | ReviewUpdateWithWhereUniqueWithoutPartnerPropertyInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutPartnerPropertyInput | ReviewUpdateManyWithWhereWithoutPartnerPropertyInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type PartnerPropertyCreateNestedOneWithoutRoomsInput = {
    create?: XOR<PartnerPropertyCreateWithoutRoomsInput, PartnerPropertyUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: PartnerPropertyCreateOrConnectWithoutRoomsInput
    connect?: PartnerPropertyWhereUniqueInput
  }

  export type BookingCreateNestedManyWithoutPartnerRoomInput = {
    create?: XOR<BookingCreateWithoutPartnerRoomInput, BookingUncheckedCreateWithoutPartnerRoomInput> | BookingCreateWithoutPartnerRoomInput[] | BookingUncheckedCreateWithoutPartnerRoomInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutPartnerRoomInput | BookingCreateOrConnectWithoutPartnerRoomInput[]
    createMany?: BookingCreateManyPartnerRoomInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutPartnerRoomInput = {
    create?: XOR<BookingCreateWithoutPartnerRoomInput, BookingUncheckedCreateWithoutPartnerRoomInput> | BookingCreateWithoutPartnerRoomInput[] | BookingUncheckedCreateWithoutPartnerRoomInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutPartnerRoomInput | BookingCreateOrConnectWithoutPartnerRoomInput[]
    createMany?: BookingCreateManyPartnerRoomInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type PartnerPropertyUpdateOneRequiredWithoutRoomsNestedInput = {
    create?: XOR<PartnerPropertyCreateWithoutRoomsInput, PartnerPropertyUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: PartnerPropertyCreateOrConnectWithoutRoomsInput
    upsert?: PartnerPropertyUpsertWithoutRoomsInput
    connect?: PartnerPropertyWhereUniqueInput
    update?: XOR<XOR<PartnerPropertyUpdateToOneWithWhereWithoutRoomsInput, PartnerPropertyUpdateWithoutRoomsInput>, PartnerPropertyUncheckedUpdateWithoutRoomsInput>
  }

  export type BookingUpdateManyWithoutPartnerRoomNestedInput = {
    create?: XOR<BookingCreateWithoutPartnerRoomInput, BookingUncheckedCreateWithoutPartnerRoomInput> | BookingCreateWithoutPartnerRoomInput[] | BookingUncheckedCreateWithoutPartnerRoomInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutPartnerRoomInput | BookingCreateOrConnectWithoutPartnerRoomInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutPartnerRoomInput | BookingUpsertWithWhereUniqueWithoutPartnerRoomInput[]
    createMany?: BookingCreateManyPartnerRoomInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutPartnerRoomInput | BookingUpdateWithWhereUniqueWithoutPartnerRoomInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutPartnerRoomInput | BookingUpdateManyWithWhereWithoutPartnerRoomInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutPartnerRoomNestedInput = {
    create?: XOR<BookingCreateWithoutPartnerRoomInput, BookingUncheckedCreateWithoutPartnerRoomInput> | BookingCreateWithoutPartnerRoomInput[] | BookingUncheckedCreateWithoutPartnerRoomInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutPartnerRoomInput | BookingCreateOrConnectWithoutPartnerRoomInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutPartnerRoomInput | BookingUpsertWithWhereUniqueWithoutPartnerRoomInput[]
    createMany?: BookingCreateManyPartnerRoomInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutPartnerRoomInput | BookingUpdateWithWhereUniqueWithoutPartnerRoomInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutPartnerRoomInput | BookingUpdateManyWithWhereWithoutPartnerRoomInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutBookingsInput = {
    create?: XOR<CustomerCreateWithoutBookingsInput, CustomerUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutBookingsInput
    connect?: CustomerWhereUniqueInput
  }

  export type PartnerPropertyCreateNestedOneWithoutBookingsInput = {
    create?: XOR<PartnerPropertyCreateWithoutBookingsInput, PartnerPropertyUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: PartnerPropertyCreateOrConnectWithoutBookingsInput
    connect?: PartnerPropertyWhereUniqueInput
  }

  export type PartnerRoomCreateNestedOneWithoutBookingsInput = {
    create?: XOR<PartnerRoomCreateWithoutBookingsInput, PartnerRoomUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: PartnerRoomCreateOrConnectWithoutBookingsInput
    connect?: PartnerRoomWhereUniqueInput
  }

  export type PaymentSubmissionCreateNestedOneWithoutBookingInput = {
    create?: XOR<PaymentSubmissionCreateWithoutBookingInput, PaymentSubmissionUncheckedCreateWithoutBookingInput>
    connectOrCreate?: PaymentSubmissionCreateOrConnectWithoutBookingInput
    connect?: PaymentSubmissionWhereUniqueInput
  }

  export type RefundRequestCreateNestedOneWithoutBookingInput = {
    create?: XOR<RefundRequestCreateWithoutBookingInput, RefundRequestUncheckedCreateWithoutBookingInput>
    connectOrCreate?: RefundRequestCreateOrConnectWithoutBookingInput
    connect?: RefundRequestWhereUniqueInput
  }

  export type ReviewCreateNestedOneWithoutBookingInput = {
    create?: XOR<ReviewCreateWithoutBookingInput, ReviewUncheckedCreateWithoutBookingInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutBookingInput
    connect?: ReviewWhereUniqueInput
  }

  export type PaymentSubmissionUncheckedCreateNestedOneWithoutBookingInput = {
    create?: XOR<PaymentSubmissionCreateWithoutBookingInput, PaymentSubmissionUncheckedCreateWithoutBookingInput>
    connectOrCreate?: PaymentSubmissionCreateOrConnectWithoutBookingInput
    connect?: PaymentSubmissionWhereUniqueInput
  }

  export type RefundRequestUncheckedCreateNestedOneWithoutBookingInput = {
    create?: XOR<RefundRequestCreateWithoutBookingInput, RefundRequestUncheckedCreateWithoutBookingInput>
    connectOrCreate?: RefundRequestCreateOrConnectWithoutBookingInput
    connect?: RefundRequestWhereUniqueInput
  }

  export type ReviewUncheckedCreateNestedOneWithoutBookingInput = {
    create?: XOR<ReviewCreateWithoutBookingInput, ReviewUncheckedCreateWithoutBookingInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutBookingInput
    connect?: ReviewWhereUniqueInput
  }

  export type CustomerUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<CustomerCreateWithoutBookingsInput, CustomerUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutBookingsInput
    upsert?: CustomerUpsertWithoutBookingsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutBookingsInput, CustomerUpdateWithoutBookingsInput>, CustomerUncheckedUpdateWithoutBookingsInput>
  }

  export type PartnerPropertyUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<PartnerPropertyCreateWithoutBookingsInput, PartnerPropertyUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: PartnerPropertyCreateOrConnectWithoutBookingsInput
    upsert?: PartnerPropertyUpsertWithoutBookingsInput
    connect?: PartnerPropertyWhereUniqueInput
    update?: XOR<XOR<PartnerPropertyUpdateToOneWithWhereWithoutBookingsInput, PartnerPropertyUpdateWithoutBookingsInput>, PartnerPropertyUncheckedUpdateWithoutBookingsInput>
  }

  export type PartnerRoomUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<PartnerRoomCreateWithoutBookingsInput, PartnerRoomUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: PartnerRoomCreateOrConnectWithoutBookingsInput
    upsert?: PartnerRoomUpsertWithoutBookingsInput
    connect?: PartnerRoomWhereUniqueInput
    update?: XOR<XOR<PartnerRoomUpdateToOneWithWhereWithoutBookingsInput, PartnerRoomUpdateWithoutBookingsInput>, PartnerRoomUncheckedUpdateWithoutBookingsInput>
  }

  export type PaymentSubmissionUpdateOneWithoutBookingNestedInput = {
    create?: XOR<PaymentSubmissionCreateWithoutBookingInput, PaymentSubmissionUncheckedCreateWithoutBookingInput>
    connectOrCreate?: PaymentSubmissionCreateOrConnectWithoutBookingInput
    upsert?: PaymentSubmissionUpsertWithoutBookingInput
    disconnect?: PaymentSubmissionWhereInput | boolean
    delete?: PaymentSubmissionWhereInput | boolean
    connect?: PaymentSubmissionWhereUniqueInput
    update?: XOR<XOR<PaymentSubmissionUpdateToOneWithWhereWithoutBookingInput, PaymentSubmissionUpdateWithoutBookingInput>, PaymentSubmissionUncheckedUpdateWithoutBookingInput>
  }

  export type RefundRequestUpdateOneWithoutBookingNestedInput = {
    create?: XOR<RefundRequestCreateWithoutBookingInput, RefundRequestUncheckedCreateWithoutBookingInput>
    connectOrCreate?: RefundRequestCreateOrConnectWithoutBookingInput
    upsert?: RefundRequestUpsertWithoutBookingInput
    disconnect?: RefundRequestWhereInput | boolean
    delete?: RefundRequestWhereInput | boolean
    connect?: RefundRequestWhereUniqueInput
    update?: XOR<XOR<RefundRequestUpdateToOneWithWhereWithoutBookingInput, RefundRequestUpdateWithoutBookingInput>, RefundRequestUncheckedUpdateWithoutBookingInput>
  }

  export type ReviewUpdateOneWithoutBookingNestedInput = {
    create?: XOR<ReviewCreateWithoutBookingInput, ReviewUncheckedCreateWithoutBookingInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutBookingInput
    upsert?: ReviewUpsertWithoutBookingInput
    disconnect?: ReviewWhereInput | boolean
    delete?: ReviewWhereInput | boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<XOR<ReviewUpdateToOneWithWhereWithoutBookingInput, ReviewUpdateWithoutBookingInput>, ReviewUncheckedUpdateWithoutBookingInput>
  }

  export type PaymentSubmissionUncheckedUpdateOneWithoutBookingNestedInput = {
    create?: XOR<PaymentSubmissionCreateWithoutBookingInput, PaymentSubmissionUncheckedCreateWithoutBookingInput>
    connectOrCreate?: PaymentSubmissionCreateOrConnectWithoutBookingInput
    upsert?: PaymentSubmissionUpsertWithoutBookingInput
    disconnect?: PaymentSubmissionWhereInput | boolean
    delete?: PaymentSubmissionWhereInput | boolean
    connect?: PaymentSubmissionWhereUniqueInput
    update?: XOR<XOR<PaymentSubmissionUpdateToOneWithWhereWithoutBookingInput, PaymentSubmissionUpdateWithoutBookingInput>, PaymentSubmissionUncheckedUpdateWithoutBookingInput>
  }

  export type RefundRequestUncheckedUpdateOneWithoutBookingNestedInput = {
    create?: XOR<RefundRequestCreateWithoutBookingInput, RefundRequestUncheckedCreateWithoutBookingInput>
    connectOrCreate?: RefundRequestCreateOrConnectWithoutBookingInput
    upsert?: RefundRequestUpsertWithoutBookingInput
    disconnect?: RefundRequestWhereInput | boolean
    delete?: RefundRequestWhereInput | boolean
    connect?: RefundRequestWhereUniqueInput
    update?: XOR<XOR<RefundRequestUpdateToOneWithWhereWithoutBookingInput, RefundRequestUpdateWithoutBookingInput>, RefundRequestUncheckedUpdateWithoutBookingInput>
  }

  export type ReviewUncheckedUpdateOneWithoutBookingNestedInput = {
    create?: XOR<ReviewCreateWithoutBookingInput, ReviewUncheckedCreateWithoutBookingInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutBookingInput
    upsert?: ReviewUpsertWithoutBookingInput
    disconnect?: ReviewWhereInput | boolean
    delete?: ReviewWhereInput | boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<XOR<ReviewUpdateToOneWithWhereWithoutBookingInput, ReviewUpdateWithoutBookingInput>, ReviewUncheckedUpdateWithoutBookingInput>
  }

  export type BookingCreateNestedOneWithoutPaymentSubmissionInput = {
    create?: XOR<BookingCreateWithoutPaymentSubmissionInput, BookingUncheckedCreateWithoutPaymentSubmissionInput>
    connectOrCreate?: BookingCreateOrConnectWithoutPaymentSubmissionInput
    connect?: BookingWhereUniqueInput
  }

  export type BookingUpdateOneRequiredWithoutPaymentSubmissionNestedInput = {
    create?: XOR<BookingCreateWithoutPaymentSubmissionInput, BookingUncheckedCreateWithoutPaymentSubmissionInput>
    connectOrCreate?: BookingCreateOrConnectWithoutPaymentSubmissionInput
    upsert?: BookingUpsertWithoutPaymentSubmissionInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutPaymentSubmissionInput, BookingUpdateWithoutPaymentSubmissionInput>, BookingUncheckedUpdateWithoutPaymentSubmissionInput>
  }

  export type BookingCreateNestedOneWithoutRefundRequestInput = {
    create?: XOR<BookingCreateWithoutRefundRequestInput, BookingUncheckedCreateWithoutRefundRequestInput>
    connectOrCreate?: BookingCreateOrConnectWithoutRefundRequestInput
    connect?: BookingWhereUniqueInput
  }

  export type BookingUpdateOneRequiredWithoutRefundRequestNestedInput = {
    create?: XOR<BookingCreateWithoutRefundRequestInput, BookingUncheckedCreateWithoutRefundRequestInput>
    connectOrCreate?: BookingCreateOrConnectWithoutRefundRequestInput
    upsert?: BookingUpsertWithoutRefundRequestInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutRefundRequestInput, BookingUpdateWithoutRefundRequestInput>, BookingUncheckedUpdateWithoutRefundRequestInput>
  }

  export type BookingCreateNestedOneWithoutReviewInput = {
    create?: XOR<BookingCreateWithoutReviewInput, BookingUncheckedCreateWithoutReviewInput>
    connectOrCreate?: BookingCreateOrConnectWithoutReviewInput
    connect?: BookingWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutReviewsInput = {
    create?: XOR<CustomerCreateWithoutReviewsInput, CustomerUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutReviewsInput
    connect?: CustomerWhereUniqueInput
  }

  export type PartnerPropertyCreateNestedOneWithoutReviewsInput = {
    create?: XOR<PartnerPropertyCreateWithoutReviewsInput, PartnerPropertyUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: PartnerPropertyCreateOrConnectWithoutReviewsInput
    connect?: PartnerPropertyWhereUniqueInput
  }

  export type BookingUpdateOneRequiredWithoutReviewNestedInput = {
    create?: XOR<BookingCreateWithoutReviewInput, BookingUncheckedCreateWithoutReviewInput>
    connectOrCreate?: BookingCreateOrConnectWithoutReviewInput
    upsert?: BookingUpsertWithoutReviewInput
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutReviewInput, BookingUpdateWithoutReviewInput>, BookingUncheckedUpdateWithoutReviewInput>
  }

  export type CustomerUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<CustomerCreateWithoutReviewsInput, CustomerUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutReviewsInput
    upsert?: CustomerUpsertWithoutReviewsInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutReviewsInput, CustomerUpdateWithoutReviewsInput>, CustomerUncheckedUpdateWithoutReviewsInput>
  }

  export type PartnerPropertyUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<PartnerPropertyCreateWithoutReviewsInput, PartnerPropertyUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: PartnerPropertyCreateOrConnectWithoutReviewsInput
    upsert?: PartnerPropertyUpsertWithoutReviewsInput
    connect?: PartnerPropertyWhereUniqueInput
    update?: XOR<XOR<PartnerPropertyUpdateToOneWithWhereWithoutReviewsInput, PartnerPropertyUpdateWithoutReviewsInput>, PartnerPropertyUncheckedUpdateWithoutReviewsInput>
  }

  export type AdminUserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<AdminUserCreateWithoutAuditLogsInput, AdminUserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: AdminUserCreateOrConnectWithoutAuditLogsInput
    connect?: AdminUserWhereUniqueInput
  }

  export type AdminUserUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<AdminUserCreateWithoutAuditLogsInput, AdminUserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: AdminUserCreateOrConnectWithoutAuditLogsInput
    upsert?: AdminUserUpsertWithoutAuditLogsInput
    connect?: AdminUserWhereUniqueInput
    update?: XOR<XOR<AdminUserUpdateToOneWithWhereWithoutAuditLogsInput, AdminUserUpdateWithoutAuditLogsInput>, AdminUserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BookingCreateWithoutCustomerInput = {
    id?: string
    bookingCode: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    partnerProperty: PartnerPropertyCreateNestedOneWithoutBookingsInput
    partnerRoom: PartnerRoomCreateNestedOneWithoutBookingsInput
    paymentSubmission?: PaymentSubmissionCreateNestedOneWithoutBookingInput
    refundRequest?: RefundRequestCreateNestedOneWithoutBookingInput
    review?: ReviewCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutCustomerInput = {
    id?: string
    bookingCode: string
    partnerPropertyId: string
    partnerRoomId: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentSubmission?: PaymentSubmissionUncheckedCreateNestedOneWithoutBookingInput
    refundRequest?: RefundRequestUncheckedCreateNestedOneWithoutBookingInput
    review?: ReviewUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutCustomerInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput>
  }

  export type BookingCreateManyCustomerInputEnvelope = {
    data: BookingCreateManyCustomerInput | BookingCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutCustomerInput = {
    id?: string
    rating: number
    reviewText: string
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    booking: BookingCreateNestedOneWithoutReviewInput
    partnerProperty: PartnerPropertyCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutCustomerInput = {
    id?: string
    bookingId: string
    partnerPropertyId: string
    rating: number
    reviewText: string
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutCustomerInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput>
  }

  export type ReviewCreateManyCustomerInputEnvelope = {
    data: ReviewCreateManyCustomerInput | ReviewCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type BookingUpsertWithWhereUniqueWithoutCustomerInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutCustomerInput, BookingUncheckedUpdateWithoutCustomerInput>
    create: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutCustomerInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutCustomerInput, BookingUncheckedUpdateWithoutCustomerInput>
  }

  export type BookingUpdateManyWithWhereWithoutCustomerInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutCustomerInput>
  }

  export type BookingScalarWhereInput = {
    AND?: BookingScalarWhereInput | BookingScalarWhereInput[]
    OR?: BookingScalarWhereInput[]
    NOT?: BookingScalarWhereInput | BookingScalarWhereInput[]
    id?: StringFilter<"Booking"> | string
    bookingCode?: StringFilter<"Booking"> | string
    customerId?: StringFilter<"Booking"> | string
    partnerPropertyId?: StringFilter<"Booking"> | string
    partnerRoomId?: StringFilter<"Booking"> | string
    slotsCount?: IntFilter<"Booking"> | number
    durationMonths?: IntFilter<"Booking"> | number
    startDate?: DateTimeFilter<"Booking"> | Date | string
    endDate?: DateTimeFilter<"Booking"> | Date | string
    pricePerSlot?: FloatFilter<"Booking"> | number
    totalAmount?: FloatFilter<"Booking"> | number
    occupantsData?: StringFilter<"Booking"> | string
    status?: StringFilter<"Booking"> | string
    cancellationReason?: StringNullableFilter<"Booking"> | string | null
    paymentDeadline?: DateTimeFilter<"Booking"> | Date | string
    verificationDeadline?: DateTimeNullableFilter<"Booking"> | Date | string | null
    checkInDeadline?: DateTimeNullableFilter<"Booking"> | Date | string | null
    isNeedsAttention?: BoolFilter<"Booking"> | boolean
    idempotencyKey?: StringFilter<"Booking"> | string
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutCustomerInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutCustomerInput, ReviewUncheckedUpdateWithoutCustomerInput>
    create: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutCustomerInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutCustomerInput, ReviewUncheckedUpdateWithoutCustomerInput>
  }

  export type ReviewUpdateManyWithWhereWithoutCustomerInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutCustomerInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    bookingId?: StringFilter<"Review"> | string
    customerId?: StringFilter<"Review"> | string
    partnerPropertyId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    reviewText?: StringFilter<"Review"> | string
    isPublished?: BoolFilter<"Review"> | boolean
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
  }

  export type SecurityAuditLogCreateWithoutAdminUserInput = {
    id?: string
    action: string
    resourceType: string
    resourceId: string
    reason: string
    ipAddress: string
    createdAt?: Date | string
  }

  export type SecurityAuditLogUncheckedCreateWithoutAdminUserInput = {
    id?: string
    action: string
    resourceType: string
    resourceId: string
    reason: string
    ipAddress: string
    createdAt?: Date | string
  }

  export type SecurityAuditLogCreateOrConnectWithoutAdminUserInput = {
    where: SecurityAuditLogWhereUniqueInput
    create: XOR<SecurityAuditLogCreateWithoutAdminUserInput, SecurityAuditLogUncheckedCreateWithoutAdminUserInput>
  }

  export type SecurityAuditLogCreateManyAdminUserInputEnvelope = {
    data: SecurityAuditLogCreateManyAdminUserInput | SecurityAuditLogCreateManyAdminUserInput[]
    skipDuplicates?: boolean
  }

  export type SecurityAuditLogUpsertWithWhereUniqueWithoutAdminUserInput = {
    where: SecurityAuditLogWhereUniqueInput
    update: XOR<SecurityAuditLogUpdateWithoutAdminUserInput, SecurityAuditLogUncheckedUpdateWithoutAdminUserInput>
    create: XOR<SecurityAuditLogCreateWithoutAdminUserInput, SecurityAuditLogUncheckedCreateWithoutAdminUserInput>
  }

  export type SecurityAuditLogUpdateWithWhereUniqueWithoutAdminUserInput = {
    where: SecurityAuditLogWhereUniqueInput
    data: XOR<SecurityAuditLogUpdateWithoutAdminUserInput, SecurityAuditLogUncheckedUpdateWithoutAdminUserInput>
  }

  export type SecurityAuditLogUpdateManyWithWhereWithoutAdminUserInput = {
    where: SecurityAuditLogScalarWhereInput
    data: XOR<SecurityAuditLogUpdateManyMutationInput, SecurityAuditLogUncheckedUpdateManyWithoutAdminUserInput>
  }

  export type SecurityAuditLogScalarWhereInput = {
    AND?: SecurityAuditLogScalarWhereInput | SecurityAuditLogScalarWhereInput[]
    OR?: SecurityAuditLogScalarWhereInput[]
    NOT?: SecurityAuditLogScalarWhereInput | SecurityAuditLogScalarWhereInput[]
    id?: StringFilter<"SecurityAuditLog"> | string
    adminUserId?: StringFilter<"SecurityAuditLog"> | string
    action?: StringFilter<"SecurityAuditLog"> | string
    resourceType?: StringFilter<"SecurityAuditLog"> | string
    resourceId?: StringFilter<"SecurityAuditLog"> | string
    reason?: StringFilter<"SecurityAuditLog"> | string
    ipAddress?: StringFilter<"SecurityAuditLog"> | string
    createdAt?: DateTimeFilter<"SecurityAuditLog"> | Date | string
  }

  export type PartnerRoomCreateWithoutPartnerPropertyInput = {
    id?: string
    kmRoomId: string
    roomNumber: string
    roomType?: string
    sizeSqm?: number | null
    facilities: string
    photos: string
    monthlyPrice: number
    totalCapacity: number
    occupiedSlots?: number
    reservedSlots?: number
    status?: string
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutPartnerRoomInput
  }

  export type PartnerRoomUncheckedCreateWithoutPartnerPropertyInput = {
    id?: string
    kmRoomId: string
    roomNumber: string
    roomType?: string
    sizeSqm?: number | null
    facilities: string
    photos: string
    monthlyPrice: number
    totalCapacity: number
    occupiedSlots?: number
    reservedSlots?: number
    status?: string
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutPartnerRoomInput
  }

  export type PartnerRoomCreateOrConnectWithoutPartnerPropertyInput = {
    where: PartnerRoomWhereUniqueInput
    create: XOR<PartnerRoomCreateWithoutPartnerPropertyInput, PartnerRoomUncheckedCreateWithoutPartnerPropertyInput>
  }

  export type PartnerRoomCreateManyPartnerPropertyInputEnvelope = {
    data: PartnerRoomCreateManyPartnerPropertyInput | PartnerRoomCreateManyPartnerPropertyInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutPartnerPropertyInput = {
    id?: string
    bookingCode: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutBookingsInput
    partnerRoom: PartnerRoomCreateNestedOneWithoutBookingsInput
    paymentSubmission?: PaymentSubmissionCreateNestedOneWithoutBookingInput
    refundRequest?: RefundRequestCreateNestedOneWithoutBookingInput
    review?: ReviewCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutPartnerPropertyInput = {
    id?: string
    bookingCode: string
    customerId: string
    partnerRoomId: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentSubmission?: PaymentSubmissionUncheckedCreateNestedOneWithoutBookingInput
    refundRequest?: RefundRequestUncheckedCreateNestedOneWithoutBookingInput
    review?: ReviewUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutPartnerPropertyInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutPartnerPropertyInput, BookingUncheckedCreateWithoutPartnerPropertyInput>
  }

  export type BookingCreateManyPartnerPropertyInputEnvelope = {
    data: BookingCreateManyPartnerPropertyInput | BookingCreateManyPartnerPropertyInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutPartnerPropertyInput = {
    id?: string
    rating: number
    reviewText: string
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    booking: BookingCreateNestedOneWithoutReviewInput
    customer: CustomerCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutPartnerPropertyInput = {
    id?: string
    bookingId: string
    customerId: string
    rating: number
    reviewText: string
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutPartnerPropertyInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutPartnerPropertyInput, ReviewUncheckedCreateWithoutPartnerPropertyInput>
  }

  export type ReviewCreateManyPartnerPropertyInputEnvelope = {
    data: ReviewCreateManyPartnerPropertyInput | ReviewCreateManyPartnerPropertyInput[]
    skipDuplicates?: boolean
  }

  export type PartnerRoomUpsertWithWhereUniqueWithoutPartnerPropertyInput = {
    where: PartnerRoomWhereUniqueInput
    update: XOR<PartnerRoomUpdateWithoutPartnerPropertyInput, PartnerRoomUncheckedUpdateWithoutPartnerPropertyInput>
    create: XOR<PartnerRoomCreateWithoutPartnerPropertyInput, PartnerRoomUncheckedCreateWithoutPartnerPropertyInput>
  }

  export type PartnerRoomUpdateWithWhereUniqueWithoutPartnerPropertyInput = {
    where: PartnerRoomWhereUniqueInput
    data: XOR<PartnerRoomUpdateWithoutPartnerPropertyInput, PartnerRoomUncheckedUpdateWithoutPartnerPropertyInput>
  }

  export type PartnerRoomUpdateManyWithWhereWithoutPartnerPropertyInput = {
    where: PartnerRoomScalarWhereInput
    data: XOR<PartnerRoomUpdateManyMutationInput, PartnerRoomUncheckedUpdateManyWithoutPartnerPropertyInput>
  }

  export type PartnerRoomScalarWhereInput = {
    AND?: PartnerRoomScalarWhereInput | PartnerRoomScalarWhereInput[]
    OR?: PartnerRoomScalarWhereInput[]
    NOT?: PartnerRoomScalarWhereInput | PartnerRoomScalarWhereInput[]
    id?: StringFilter<"PartnerRoom"> | string
    kmRoomId?: StringFilter<"PartnerRoom"> | string
    partnerPropertyId?: StringFilter<"PartnerRoom"> | string
    roomNumber?: StringFilter<"PartnerRoom"> | string
    roomType?: StringFilter<"PartnerRoom"> | string
    sizeSqm?: FloatNullableFilter<"PartnerRoom"> | number | null
    facilities?: StringFilter<"PartnerRoom"> | string
    photos?: StringFilter<"PartnerRoom"> | string
    monthlyPrice?: FloatFilter<"PartnerRoom"> | number
    totalCapacity?: IntFilter<"PartnerRoom"> | number
    occupiedSlots?: IntFilter<"PartnerRoom"> | number
    reservedSlots?: IntFilter<"PartnerRoom"> | number
    status?: StringFilter<"PartnerRoom"> | string
    lastSyncedAt?: DateTimeNullableFilter<"PartnerRoom"> | Date | string | null
    createdAt?: DateTimeFilter<"PartnerRoom"> | Date | string
    updatedAt?: DateTimeFilter<"PartnerRoom"> | Date | string
  }

  export type BookingUpsertWithWhereUniqueWithoutPartnerPropertyInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutPartnerPropertyInput, BookingUncheckedUpdateWithoutPartnerPropertyInput>
    create: XOR<BookingCreateWithoutPartnerPropertyInput, BookingUncheckedCreateWithoutPartnerPropertyInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutPartnerPropertyInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutPartnerPropertyInput, BookingUncheckedUpdateWithoutPartnerPropertyInput>
  }

  export type BookingUpdateManyWithWhereWithoutPartnerPropertyInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutPartnerPropertyInput>
  }

  export type ReviewUpsertWithWhereUniqueWithoutPartnerPropertyInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutPartnerPropertyInput, ReviewUncheckedUpdateWithoutPartnerPropertyInput>
    create: XOR<ReviewCreateWithoutPartnerPropertyInput, ReviewUncheckedCreateWithoutPartnerPropertyInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutPartnerPropertyInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutPartnerPropertyInput, ReviewUncheckedUpdateWithoutPartnerPropertyInput>
  }

  export type ReviewUpdateManyWithWhereWithoutPartnerPropertyInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutPartnerPropertyInput>
  }

  export type PartnerPropertyCreateWithoutRoomsInput = {
    id?: string
    kmPropertyId: string
    ownerName: string
    ownerPhone: string
    ownerWhatsapp: string
    name: string
    slug: string
    address: string
    city: string
    district: string
    latitude?: number | null
    longitude?: number | null
    description?: string | null
    genderType?: string
    generalFacilities: string
    photos: string
    termsAndRules?: string | null
    requirementsSchema: string
    paymentBankName: string
    paymentAccountNumber: string
    paymentAccountHolder: string
    paymentQrisUrl?: string | null
    partnershipStatus?: string
    rejectionReason?: string | null
    avgRating?: number
    totalReviews?: number
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutPartnerPropertyInput
    reviews?: ReviewCreateNestedManyWithoutPartnerPropertyInput
  }

  export type PartnerPropertyUncheckedCreateWithoutRoomsInput = {
    id?: string
    kmPropertyId: string
    ownerName: string
    ownerPhone: string
    ownerWhatsapp: string
    name: string
    slug: string
    address: string
    city: string
    district: string
    latitude?: number | null
    longitude?: number | null
    description?: string | null
    genderType?: string
    generalFacilities: string
    photos: string
    termsAndRules?: string | null
    requirementsSchema: string
    paymentBankName: string
    paymentAccountNumber: string
    paymentAccountHolder: string
    paymentQrisUrl?: string | null
    partnershipStatus?: string
    rejectionReason?: string | null
    avgRating?: number
    totalReviews?: number
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutPartnerPropertyInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutPartnerPropertyInput
  }

  export type PartnerPropertyCreateOrConnectWithoutRoomsInput = {
    where: PartnerPropertyWhereUniqueInput
    create: XOR<PartnerPropertyCreateWithoutRoomsInput, PartnerPropertyUncheckedCreateWithoutRoomsInput>
  }

  export type BookingCreateWithoutPartnerRoomInput = {
    id?: string
    bookingCode: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutBookingsInput
    partnerProperty: PartnerPropertyCreateNestedOneWithoutBookingsInput
    paymentSubmission?: PaymentSubmissionCreateNestedOneWithoutBookingInput
    refundRequest?: RefundRequestCreateNestedOneWithoutBookingInput
    review?: ReviewCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutPartnerRoomInput = {
    id?: string
    bookingCode: string
    customerId: string
    partnerPropertyId: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentSubmission?: PaymentSubmissionUncheckedCreateNestedOneWithoutBookingInput
    refundRequest?: RefundRequestUncheckedCreateNestedOneWithoutBookingInput
    review?: ReviewUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutPartnerRoomInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutPartnerRoomInput, BookingUncheckedCreateWithoutPartnerRoomInput>
  }

  export type BookingCreateManyPartnerRoomInputEnvelope = {
    data: BookingCreateManyPartnerRoomInput | BookingCreateManyPartnerRoomInput[]
    skipDuplicates?: boolean
  }

  export type PartnerPropertyUpsertWithoutRoomsInput = {
    update: XOR<PartnerPropertyUpdateWithoutRoomsInput, PartnerPropertyUncheckedUpdateWithoutRoomsInput>
    create: XOR<PartnerPropertyCreateWithoutRoomsInput, PartnerPropertyUncheckedCreateWithoutRoomsInput>
    where?: PartnerPropertyWhereInput
  }

  export type PartnerPropertyUpdateToOneWithWhereWithoutRoomsInput = {
    where?: PartnerPropertyWhereInput
    data: XOR<PartnerPropertyUpdateWithoutRoomsInput, PartnerPropertyUncheckedUpdateWithoutRoomsInput>
  }

  export type PartnerPropertyUpdateWithoutRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmPropertyId?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    ownerWhatsapp?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    genderType?: StringFieldUpdateOperationsInput | string
    generalFacilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    termsAndRules?: NullableStringFieldUpdateOperationsInput | string | null
    requirementsSchema?: StringFieldUpdateOperationsInput | string
    paymentBankName?: StringFieldUpdateOperationsInput | string
    paymentAccountNumber?: StringFieldUpdateOperationsInput | string
    paymentAccountHolder?: StringFieldUpdateOperationsInput | string
    paymentQrisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnershipStatus?: StringFieldUpdateOperationsInput | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutPartnerPropertyNestedInput
    reviews?: ReviewUpdateManyWithoutPartnerPropertyNestedInput
  }

  export type PartnerPropertyUncheckedUpdateWithoutRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmPropertyId?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    ownerWhatsapp?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    genderType?: StringFieldUpdateOperationsInput | string
    generalFacilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    termsAndRules?: NullableStringFieldUpdateOperationsInput | string | null
    requirementsSchema?: StringFieldUpdateOperationsInput | string
    paymentBankName?: StringFieldUpdateOperationsInput | string
    paymentAccountNumber?: StringFieldUpdateOperationsInput | string
    paymentAccountHolder?: StringFieldUpdateOperationsInput | string
    paymentQrisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnershipStatus?: StringFieldUpdateOperationsInput | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutPartnerPropertyNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutPartnerPropertyNestedInput
  }

  export type BookingUpsertWithWhereUniqueWithoutPartnerRoomInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutPartnerRoomInput, BookingUncheckedUpdateWithoutPartnerRoomInput>
    create: XOR<BookingCreateWithoutPartnerRoomInput, BookingUncheckedCreateWithoutPartnerRoomInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutPartnerRoomInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutPartnerRoomInput, BookingUncheckedUpdateWithoutPartnerRoomInput>
  }

  export type BookingUpdateManyWithWhereWithoutPartnerRoomInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutPartnerRoomInput>
  }

  export type CustomerCreateWithoutBookingsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    phoneNumber: string
    isVerified?: boolean
    verificationToken?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutBookingsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    phoneNumber: string
    isVerified?: boolean
    verificationToken?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutBookingsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutBookingsInput, CustomerUncheckedCreateWithoutBookingsInput>
  }

  export type PartnerPropertyCreateWithoutBookingsInput = {
    id?: string
    kmPropertyId: string
    ownerName: string
    ownerPhone: string
    ownerWhatsapp: string
    name: string
    slug: string
    address: string
    city: string
    district: string
    latitude?: number | null
    longitude?: number | null
    description?: string | null
    genderType?: string
    generalFacilities: string
    photos: string
    termsAndRules?: string | null
    requirementsSchema: string
    paymentBankName: string
    paymentAccountNumber: string
    paymentAccountHolder: string
    paymentQrisUrl?: string | null
    partnershipStatus?: string
    rejectionReason?: string | null
    avgRating?: number
    totalReviews?: number
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: PartnerRoomCreateNestedManyWithoutPartnerPropertyInput
    reviews?: ReviewCreateNestedManyWithoutPartnerPropertyInput
  }

  export type PartnerPropertyUncheckedCreateWithoutBookingsInput = {
    id?: string
    kmPropertyId: string
    ownerName: string
    ownerPhone: string
    ownerWhatsapp: string
    name: string
    slug: string
    address: string
    city: string
    district: string
    latitude?: number | null
    longitude?: number | null
    description?: string | null
    genderType?: string
    generalFacilities: string
    photos: string
    termsAndRules?: string | null
    requirementsSchema: string
    paymentBankName: string
    paymentAccountNumber: string
    paymentAccountHolder: string
    paymentQrisUrl?: string | null
    partnershipStatus?: string
    rejectionReason?: string | null
    avgRating?: number
    totalReviews?: number
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: PartnerRoomUncheckedCreateNestedManyWithoutPartnerPropertyInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutPartnerPropertyInput
  }

  export type PartnerPropertyCreateOrConnectWithoutBookingsInput = {
    where: PartnerPropertyWhereUniqueInput
    create: XOR<PartnerPropertyCreateWithoutBookingsInput, PartnerPropertyUncheckedCreateWithoutBookingsInput>
  }

  export type PartnerRoomCreateWithoutBookingsInput = {
    id?: string
    kmRoomId: string
    roomNumber: string
    roomType?: string
    sizeSqm?: number | null
    facilities: string
    photos: string
    monthlyPrice: number
    totalCapacity: number
    occupiedSlots?: number
    reservedSlots?: number
    status?: string
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    partnerProperty: PartnerPropertyCreateNestedOneWithoutRoomsInput
  }

  export type PartnerRoomUncheckedCreateWithoutBookingsInput = {
    id?: string
    kmRoomId: string
    partnerPropertyId: string
    roomNumber: string
    roomType?: string
    sizeSqm?: number | null
    facilities: string
    photos: string
    monthlyPrice: number
    totalCapacity: number
    occupiedSlots?: number
    reservedSlots?: number
    status?: string
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerRoomCreateOrConnectWithoutBookingsInput = {
    where: PartnerRoomWhereUniqueInput
    create: XOR<PartnerRoomCreateWithoutBookingsInput, PartnerRoomUncheckedCreateWithoutBookingsInput>
  }

  export type PaymentSubmissionCreateWithoutBookingInput = {
    id?: string
    transferReceiptUrl: string
    senderBankName?: string | null
    senderAccountHolder?: string | null
    submissionNotes?: string | null
    submittedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentSubmissionUncheckedCreateWithoutBookingInput = {
    id?: string
    transferReceiptUrl: string
    senderBankName?: string | null
    senderAccountHolder?: string | null
    submissionNotes?: string | null
    submittedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentSubmissionCreateOrConnectWithoutBookingInput = {
    where: PaymentSubmissionWhereUniqueInput
    create: XOR<PaymentSubmissionCreateWithoutBookingInput, PaymentSubmissionUncheckedCreateWithoutBookingInput>
  }

  export type RefundRequestCreateWithoutBookingInput = {
    id?: string
    bankName: string
    accountNumber: string
    accountHolder: string
    refundAmount: number
    penaltyDeduction?: number
    status?: string
    requestedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefundRequestUncheckedCreateWithoutBookingInput = {
    id?: string
    bankName: string
    accountNumber: string
    accountHolder: string
    refundAmount: number
    penaltyDeduction?: number
    status?: string
    requestedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefundRequestCreateOrConnectWithoutBookingInput = {
    where: RefundRequestWhereUniqueInput
    create: XOR<RefundRequestCreateWithoutBookingInput, RefundRequestUncheckedCreateWithoutBookingInput>
  }

  export type ReviewCreateWithoutBookingInput = {
    id?: string
    rating: number
    reviewText: string
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutReviewsInput
    partnerProperty: PartnerPropertyCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutBookingInput = {
    id?: string
    customerId: string
    partnerPropertyId: string
    rating: number
    reviewText: string
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutBookingInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutBookingInput, ReviewUncheckedCreateWithoutBookingInput>
  }

  export type CustomerUpsertWithoutBookingsInput = {
    update: XOR<CustomerUpdateWithoutBookingsInput, CustomerUncheckedUpdateWithoutBookingsInput>
    create: XOR<CustomerCreateWithoutBookingsInput, CustomerUncheckedCreateWithoutBookingsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutBookingsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutBookingsInput, CustomerUncheckedUpdateWithoutBookingsInput>
  }

  export type CustomerUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type PartnerPropertyUpsertWithoutBookingsInput = {
    update: XOR<PartnerPropertyUpdateWithoutBookingsInput, PartnerPropertyUncheckedUpdateWithoutBookingsInput>
    create: XOR<PartnerPropertyCreateWithoutBookingsInput, PartnerPropertyUncheckedCreateWithoutBookingsInput>
    where?: PartnerPropertyWhereInput
  }

  export type PartnerPropertyUpdateToOneWithWhereWithoutBookingsInput = {
    where?: PartnerPropertyWhereInput
    data: XOR<PartnerPropertyUpdateWithoutBookingsInput, PartnerPropertyUncheckedUpdateWithoutBookingsInput>
  }

  export type PartnerPropertyUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmPropertyId?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    ownerWhatsapp?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    genderType?: StringFieldUpdateOperationsInput | string
    generalFacilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    termsAndRules?: NullableStringFieldUpdateOperationsInput | string | null
    requirementsSchema?: StringFieldUpdateOperationsInput | string
    paymentBankName?: StringFieldUpdateOperationsInput | string
    paymentAccountNumber?: StringFieldUpdateOperationsInput | string
    paymentAccountHolder?: StringFieldUpdateOperationsInput | string
    paymentQrisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnershipStatus?: StringFieldUpdateOperationsInput | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: PartnerRoomUpdateManyWithoutPartnerPropertyNestedInput
    reviews?: ReviewUpdateManyWithoutPartnerPropertyNestedInput
  }

  export type PartnerPropertyUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmPropertyId?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    ownerWhatsapp?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    genderType?: StringFieldUpdateOperationsInput | string
    generalFacilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    termsAndRules?: NullableStringFieldUpdateOperationsInput | string | null
    requirementsSchema?: StringFieldUpdateOperationsInput | string
    paymentBankName?: StringFieldUpdateOperationsInput | string
    paymentAccountNumber?: StringFieldUpdateOperationsInput | string
    paymentAccountHolder?: StringFieldUpdateOperationsInput | string
    paymentQrisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnershipStatus?: StringFieldUpdateOperationsInput | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: PartnerRoomUncheckedUpdateManyWithoutPartnerPropertyNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutPartnerPropertyNestedInput
  }

  export type PartnerRoomUpsertWithoutBookingsInput = {
    update: XOR<PartnerRoomUpdateWithoutBookingsInput, PartnerRoomUncheckedUpdateWithoutBookingsInput>
    create: XOR<PartnerRoomCreateWithoutBookingsInput, PartnerRoomUncheckedCreateWithoutBookingsInput>
    where?: PartnerRoomWhereInput
  }

  export type PartnerRoomUpdateToOneWithWhereWithoutBookingsInput = {
    where?: PartnerRoomWhereInput
    data: XOR<PartnerRoomUpdateWithoutBookingsInput, PartnerRoomUncheckedUpdateWithoutBookingsInput>
  }

  export type PartnerRoomUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmRoomId?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    roomType?: StringFieldUpdateOperationsInput | string
    sizeSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    facilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: FloatFieldUpdateOperationsInput | number
    totalCapacity?: IntFieldUpdateOperationsInput | number
    occupiedSlots?: IntFieldUpdateOperationsInput | number
    reservedSlots?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    partnerProperty?: PartnerPropertyUpdateOneRequiredWithoutRoomsNestedInput
  }

  export type PartnerRoomUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmRoomId?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    roomType?: StringFieldUpdateOperationsInput | string
    sizeSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    facilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: FloatFieldUpdateOperationsInput | number
    totalCapacity?: IntFieldUpdateOperationsInput | number
    occupiedSlots?: IntFieldUpdateOperationsInput | number
    reservedSlots?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentSubmissionUpsertWithoutBookingInput = {
    update: XOR<PaymentSubmissionUpdateWithoutBookingInput, PaymentSubmissionUncheckedUpdateWithoutBookingInput>
    create: XOR<PaymentSubmissionCreateWithoutBookingInput, PaymentSubmissionUncheckedCreateWithoutBookingInput>
    where?: PaymentSubmissionWhereInput
  }

  export type PaymentSubmissionUpdateToOneWithWhereWithoutBookingInput = {
    where?: PaymentSubmissionWhereInput
    data: XOR<PaymentSubmissionUpdateWithoutBookingInput, PaymentSubmissionUncheckedUpdateWithoutBookingInput>
  }

  export type PaymentSubmissionUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    transferReceiptUrl?: StringFieldUpdateOperationsInput | string
    senderBankName?: NullableStringFieldUpdateOperationsInput | string | null
    senderAccountHolder?: NullableStringFieldUpdateOperationsInput | string | null
    submissionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentSubmissionUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    transferReceiptUrl?: StringFieldUpdateOperationsInput | string
    senderBankName?: NullableStringFieldUpdateOperationsInput | string | null
    senderAccountHolder?: NullableStringFieldUpdateOperationsInput | string | null
    submissionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundRequestUpsertWithoutBookingInput = {
    update: XOR<RefundRequestUpdateWithoutBookingInput, RefundRequestUncheckedUpdateWithoutBookingInput>
    create: XOR<RefundRequestCreateWithoutBookingInput, RefundRequestUncheckedCreateWithoutBookingInput>
    where?: RefundRequestWhereInput
  }

  export type RefundRequestUpdateToOneWithWhereWithoutBookingInput = {
    where?: RefundRequestWhereInput
    data: XOR<RefundRequestUpdateWithoutBookingInput, RefundRequestUncheckedUpdateWithoutBookingInput>
  }

  export type RefundRequestUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    accountHolder?: StringFieldUpdateOperationsInput | string
    refundAmount?: FloatFieldUpdateOperationsInput | number
    penaltyDeduction?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundRequestUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    bankName?: StringFieldUpdateOperationsInput | string
    accountNumber?: StringFieldUpdateOperationsInput | string
    accountHolder?: StringFieldUpdateOperationsInput | string
    refundAmount?: FloatFieldUpdateOperationsInput | number
    penaltyDeduction?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpsertWithoutBookingInput = {
    update: XOR<ReviewUpdateWithoutBookingInput, ReviewUncheckedUpdateWithoutBookingInput>
    create: XOR<ReviewCreateWithoutBookingInput, ReviewUncheckedCreateWithoutBookingInput>
    where?: ReviewWhereInput
  }

  export type ReviewUpdateToOneWithWhereWithoutBookingInput = {
    where?: ReviewWhereInput
    data: XOR<ReviewUpdateWithoutBookingInput, ReviewUncheckedUpdateWithoutBookingInput>
  }

  export type ReviewUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    reviewText?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutReviewsNestedInput
    partnerProperty?: PartnerPropertyUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    reviewText?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateWithoutPaymentSubmissionInput = {
    id?: string
    bookingCode: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutBookingsInput
    partnerProperty: PartnerPropertyCreateNestedOneWithoutBookingsInput
    partnerRoom: PartnerRoomCreateNestedOneWithoutBookingsInput
    refundRequest?: RefundRequestCreateNestedOneWithoutBookingInput
    review?: ReviewCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutPaymentSubmissionInput = {
    id?: string
    bookingCode: string
    customerId: string
    partnerPropertyId: string
    partnerRoomId: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refundRequest?: RefundRequestUncheckedCreateNestedOneWithoutBookingInput
    review?: ReviewUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutPaymentSubmissionInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutPaymentSubmissionInput, BookingUncheckedCreateWithoutPaymentSubmissionInput>
  }

  export type BookingUpsertWithoutPaymentSubmissionInput = {
    update: XOR<BookingUpdateWithoutPaymentSubmissionInput, BookingUncheckedUpdateWithoutPaymentSubmissionInput>
    create: XOR<BookingCreateWithoutPaymentSubmissionInput, BookingUncheckedCreateWithoutPaymentSubmissionInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutPaymentSubmissionInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutPaymentSubmissionInput, BookingUncheckedUpdateWithoutPaymentSubmissionInput>
  }

  export type BookingUpdateWithoutPaymentSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutBookingsNestedInput
    partnerProperty?: PartnerPropertyUpdateOneRequiredWithoutBookingsNestedInput
    partnerRoom?: PartnerRoomUpdateOneRequiredWithoutBookingsNestedInput
    refundRequest?: RefundRequestUpdateOneWithoutBookingNestedInput
    review?: ReviewUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutPaymentSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    partnerRoomId?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refundRequest?: RefundRequestUncheckedUpdateOneWithoutBookingNestedInput
    review?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingCreateWithoutRefundRequestInput = {
    id?: string
    bookingCode: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutBookingsInput
    partnerProperty: PartnerPropertyCreateNestedOneWithoutBookingsInput
    partnerRoom: PartnerRoomCreateNestedOneWithoutBookingsInput
    paymentSubmission?: PaymentSubmissionCreateNestedOneWithoutBookingInput
    review?: ReviewCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutRefundRequestInput = {
    id?: string
    bookingCode: string
    customerId: string
    partnerPropertyId: string
    partnerRoomId: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentSubmission?: PaymentSubmissionUncheckedCreateNestedOneWithoutBookingInput
    review?: ReviewUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutRefundRequestInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutRefundRequestInput, BookingUncheckedCreateWithoutRefundRequestInput>
  }

  export type BookingUpsertWithoutRefundRequestInput = {
    update: XOR<BookingUpdateWithoutRefundRequestInput, BookingUncheckedUpdateWithoutRefundRequestInput>
    create: XOR<BookingCreateWithoutRefundRequestInput, BookingUncheckedCreateWithoutRefundRequestInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutRefundRequestInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutRefundRequestInput, BookingUncheckedUpdateWithoutRefundRequestInput>
  }

  export type BookingUpdateWithoutRefundRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutBookingsNestedInput
    partnerProperty?: PartnerPropertyUpdateOneRequiredWithoutBookingsNestedInput
    partnerRoom?: PartnerRoomUpdateOneRequiredWithoutBookingsNestedInput
    paymentSubmission?: PaymentSubmissionUpdateOneWithoutBookingNestedInput
    review?: ReviewUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutRefundRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    partnerRoomId?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentSubmission?: PaymentSubmissionUncheckedUpdateOneWithoutBookingNestedInput
    review?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingCreateWithoutReviewInput = {
    id?: string
    bookingCode: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutBookingsInput
    partnerProperty: PartnerPropertyCreateNestedOneWithoutBookingsInput
    partnerRoom: PartnerRoomCreateNestedOneWithoutBookingsInput
    paymentSubmission?: PaymentSubmissionCreateNestedOneWithoutBookingInput
    refundRequest?: RefundRequestCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutReviewInput = {
    id?: string
    bookingCode: string
    customerId: string
    partnerPropertyId: string
    partnerRoomId: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentSubmission?: PaymentSubmissionUncheckedCreateNestedOneWithoutBookingInput
    refundRequest?: RefundRequestUncheckedCreateNestedOneWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutReviewInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutReviewInput, BookingUncheckedCreateWithoutReviewInput>
  }

  export type CustomerCreateWithoutReviewsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    phoneNumber: string
    isVerified?: boolean
    verificationToken?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutReviewsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    phoneNumber: string
    isVerified?: boolean
    verificationToken?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutReviewsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutReviewsInput, CustomerUncheckedCreateWithoutReviewsInput>
  }

  export type PartnerPropertyCreateWithoutReviewsInput = {
    id?: string
    kmPropertyId: string
    ownerName: string
    ownerPhone: string
    ownerWhatsapp: string
    name: string
    slug: string
    address: string
    city: string
    district: string
    latitude?: number | null
    longitude?: number | null
    description?: string | null
    genderType?: string
    generalFacilities: string
    photos: string
    termsAndRules?: string | null
    requirementsSchema: string
    paymentBankName: string
    paymentAccountNumber: string
    paymentAccountHolder: string
    paymentQrisUrl?: string | null
    partnershipStatus?: string
    rejectionReason?: string | null
    avgRating?: number
    totalReviews?: number
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: PartnerRoomCreateNestedManyWithoutPartnerPropertyInput
    bookings?: BookingCreateNestedManyWithoutPartnerPropertyInput
  }

  export type PartnerPropertyUncheckedCreateWithoutReviewsInput = {
    id?: string
    kmPropertyId: string
    ownerName: string
    ownerPhone: string
    ownerWhatsapp: string
    name: string
    slug: string
    address: string
    city: string
    district: string
    latitude?: number | null
    longitude?: number | null
    description?: string | null
    genderType?: string
    generalFacilities: string
    photos: string
    termsAndRules?: string | null
    requirementsSchema: string
    paymentBankName: string
    paymentAccountNumber: string
    paymentAccountHolder: string
    paymentQrisUrl?: string | null
    partnershipStatus?: string
    rejectionReason?: string | null
    avgRating?: number
    totalReviews?: number
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: PartnerRoomUncheckedCreateNestedManyWithoutPartnerPropertyInput
    bookings?: BookingUncheckedCreateNestedManyWithoutPartnerPropertyInput
  }

  export type PartnerPropertyCreateOrConnectWithoutReviewsInput = {
    where: PartnerPropertyWhereUniqueInput
    create: XOR<PartnerPropertyCreateWithoutReviewsInput, PartnerPropertyUncheckedCreateWithoutReviewsInput>
  }

  export type BookingUpsertWithoutReviewInput = {
    update: XOR<BookingUpdateWithoutReviewInput, BookingUncheckedUpdateWithoutReviewInput>
    create: XOR<BookingCreateWithoutReviewInput, BookingUncheckedCreateWithoutReviewInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutReviewInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutReviewInput, BookingUncheckedUpdateWithoutReviewInput>
  }

  export type BookingUpdateWithoutReviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutBookingsNestedInput
    partnerProperty?: PartnerPropertyUpdateOneRequiredWithoutBookingsNestedInput
    partnerRoom?: PartnerRoomUpdateOneRequiredWithoutBookingsNestedInput
    paymentSubmission?: PaymentSubmissionUpdateOneWithoutBookingNestedInput
    refundRequest?: RefundRequestUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutReviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    partnerRoomId?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentSubmission?: PaymentSubmissionUncheckedUpdateOneWithoutBookingNestedInput
    refundRequest?: RefundRequestUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type CustomerUpsertWithoutReviewsInput = {
    update: XOR<CustomerUpdateWithoutReviewsInput, CustomerUncheckedUpdateWithoutReviewsInput>
    create: XOR<CustomerCreateWithoutReviewsInput, CustomerUncheckedCreateWithoutReviewsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutReviewsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutReviewsInput, CustomerUncheckedUpdateWithoutReviewsInput>
  }

  export type CustomerUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type PartnerPropertyUpsertWithoutReviewsInput = {
    update: XOR<PartnerPropertyUpdateWithoutReviewsInput, PartnerPropertyUncheckedUpdateWithoutReviewsInput>
    create: XOR<PartnerPropertyCreateWithoutReviewsInput, PartnerPropertyUncheckedCreateWithoutReviewsInput>
    where?: PartnerPropertyWhereInput
  }

  export type PartnerPropertyUpdateToOneWithWhereWithoutReviewsInput = {
    where?: PartnerPropertyWhereInput
    data: XOR<PartnerPropertyUpdateWithoutReviewsInput, PartnerPropertyUncheckedUpdateWithoutReviewsInput>
  }

  export type PartnerPropertyUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmPropertyId?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    ownerWhatsapp?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    genderType?: StringFieldUpdateOperationsInput | string
    generalFacilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    termsAndRules?: NullableStringFieldUpdateOperationsInput | string | null
    requirementsSchema?: StringFieldUpdateOperationsInput | string
    paymentBankName?: StringFieldUpdateOperationsInput | string
    paymentAccountNumber?: StringFieldUpdateOperationsInput | string
    paymentAccountHolder?: StringFieldUpdateOperationsInput | string
    paymentQrisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnershipStatus?: StringFieldUpdateOperationsInput | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: PartnerRoomUpdateManyWithoutPartnerPropertyNestedInput
    bookings?: BookingUpdateManyWithoutPartnerPropertyNestedInput
  }

  export type PartnerPropertyUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmPropertyId?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    ownerPhone?: StringFieldUpdateOperationsInput | string
    ownerWhatsapp?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    genderType?: StringFieldUpdateOperationsInput | string
    generalFacilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    termsAndRules?: NullableStringFieldUpdateOperationsInput | string | null
    requirementsSchema?: StringFieldUpdateOperationsInput | string
    paymentBankName?: StringFieldUpdateOperationsInput | string
    paymentAccountNumber?: StringFieldUpdateOperationsInput | string
    paymentAccountHolder?: StringFieldUpdateOperationsInput | string
    paymentQrisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnershipStatus?: StringFieldUpdateOperationsInput | string
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    avgRating?: FloatFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: PartnerRoomUncheckedUpdateManyWithoutPartnerPropertyNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutPartnerPropertyNestedInput
  }

  export type AdminUserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserCreateOrConnectWithoutAuditLogsInput = {
    where: AdminUserWhereUniqueInput
    create: XOR<AdminUserCreateWithoutAuditLogsInput, AdminUserUncheckedCreateWithoutAuditLogsInput>
  }

  export type AdminUserUpsertWithoutAuditLogsInput = {
    update: XOR<AdminUserUpdateWithoutAuditLogsInput, AdminUserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<AdminUserCreateWithoutAuditLogsInput, AdminUserUncheckedCreateWithoutAuditLogsInput>
    where?: AdminUserWhereInput
  }

  export type AdminUserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: AdminUserWhereInput
    data: XOR<AdminUserUpdateWithoutAuditLogsInput, AdminUserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type AdminUserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyCustomerInput = {
    id?: string
    bookingCode: string
    partnerPropertyId: string
    partnerRoomId: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateManyCustomerInput = {
    id?: string
    bookingId: string
    partnerPropertyId: string
    rating: number
    reviewText: string
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    partnerProperty?: PartnerPropertyUpdateOneRequiredWithoutBookingsNestedInput
    partnerRoom?: PartnerRoomUpdateOneRequiredWithoutBookingsNestedInput
    paymentSubmission?: PaymentSubmissionUpdateOneWithoutBookingNestedInput
    refundRequest?: RefundRequestUpdateOneWithoutBookingNestedInput
    review?: ReviewUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    partnerRoomId?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentSubmission?: PaymentSubmissionUncheckedUpdateOneWithoutBookingNestedInput
    refundRequest?: RefundRequestUncheckedUpdateOneWithoutBookingNestedInput
    review?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    partnerRoomId?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    reviewText?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutReviewNestedInput
    partnerProperty?: PartnerPropertyUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    reviewText?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    reviewText?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityAuditLogCreateManyAdminUserInput = {
    id?: string
    action: string
    resourceType: string
    resourceId: string
    reason: string
    ipAddress: string
    createdAt?: Date | string
  }

  export type SecurityAuditLogUpdateWithoutAdminUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityAuditLogUncheckedUpdateWithoutAdminUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityAuditLogUncheckedUpdateManyWithoutAdminUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerRoomCreateManyPartnerPropertyInput = {
    id?: string
    kmRoomId: string
    roomNumber: string
    roomType?: string
    sizeSqm?: number | null
    facilities: string
    photos: string
    monthlyPrice: number
    totalCapacity: number
    occupiedSlots?: number
    reservedSlots?: number
    status?: string
    lastSyncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateManyPartnerPropertyInput = {
    id?: string
    bookingCode: string
    customerId: string
    partnerRoomId: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateManyPartnerPropertyInput = {
    id?: string
    bookingId: string
    customerId: string
    rating: number
    reviewText: string
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerRoomUpdateWithoutPartnerPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmRoomId?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    roomType?: StringFieldUpdateOperationsInput | string
    sizeSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    facilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: FloatFieldUpdateOperationsInput | number
    totalCapacity?: IntFieldUpdateOperationsInput | number
    occupiedSlots?: IntFieldUpdateOperationsInput | number
    reservedSlots?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutPartnerRoomNestedInput
  }

  export type PartnerRoomUncheckedUpdateWithoutPartnerPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmRoomId?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    roomType?: StringFieldUpdateOperationsInput | string
    sizeSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    facilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: FloatFieldUpdateOperationsInput | number
    totalCapacity?: IntFieldUpdateOperationsInput | number
    occupiedSlots?: IntFieldUpdateOperationsInput | number
    reservedSlots?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutPartnerRoomNestedInput
  }

  export type PartnerRoomUncheckedUpdateManyWithoutPartnerPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kmRoomId?: StringFieldUpdateOperationsInput | string
    roomNumber?: StringFieldUpdateOperationsInput | string
    roomType?: StringFieldUpdateOperationsInput | string
    sizeSqm?: NullableFloatFieldUpdateOperationsInput | number | null
    facilities?: StringFieldUpdateOperationsInput | string
    photos?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: FloatFieldUpdateOperationsInput | number
    totalCapacity?: IntFieldUpdateOperationsInput | number
    occupiedSlots?: IntFieldUpdateOperationsInput | number
    reservedSlots?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUpdateWithoutPartnerPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutBookingsNestedInput
    partnerRoom?: PartnerRoomUpdateOneRequiredWithoutBookingsNestedInput
    paymentSubmission?: PaymentSubmissionUpdateOneWithoutBookingNestedInput
    refundRequest?: RefundRequestUpdateOneWithoutBookingNestedInput
    review?: ReviewUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutPartnerPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    partnerRoomId?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentSubmission?: PaymentSubmissionUncheckedUpdateOneWithoutBookingNestedInput
    refundRequest?: RefundRequestUncheckedUpdateOneWithoutBookingNestedInput
    review?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutPartnerPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    partnerRoomId?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutPartnerPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    reviewText?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneRequiredWithoutReviewNestedInput
    customer?: CustomerUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutPartnerPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    reviewText?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutPartnerPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    reviewText?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyPartnerRoomInput = {
    id?: string
    bookingCode: string
    customerId: string
    partnerPropertyId: string
    slotsCount: number
    durationMonths: number
    startDate: Date | string
    endDate: Date | string
    pricePerSlot: number
    totalAmount: number
    occupantsData: string
    status?: string
    cancellationReason?: string | null
    paymentDeadline: Date | string
    verificationDeadline?: Date | string | null
    checkInDeadline?: Date | string | null
    isNeedsAttention?: boolean
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateWithoutPartnerRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutBookingsNestedInput
    partnerProperty?: PartnerPropertyUpdateOneRequiredWithoutBookingsNestedInput
    paymentSubmission?: PaymentSubmissionUpdateOneWithoutBookingNestedInput
    refundRequest?: RefundRequestUpdateOneWithoutBookingNestedInput
    review?: ReviewUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutPartnerRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentSubmission?: PaymentSubmissionUncheckedUpdateOneWithoutBookingNestedInput
    refundRequest?: RefundRequestUncheckedUpdateOneWithoutBookingNestedInput
    review?: ReviewUncheckedUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutPartnerRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    partnerPropertyId?: StringFieldUpdateOperationsInput | string
    slotsCount?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    pricePerSlot?: FloatFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    occupantsData?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    cancellationReason?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkInDeadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isNeedsAttention?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use CustomerCountOutputTypeDefaultArgs instead
     */
    export type CustomerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AdminUserCountOutputTypeDefaultArgs instead
     */
    export type AdminUserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminUserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PartnerPropertyCountOutputTypeDefaultArgs instead
     */
    export type PartnerPropertyCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PartnerPropertyCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PartnerRoomCountOutputTypeDefaultArgs instead
     */
    export type PartnerRoomCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PartnerRoomCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomerDefaultArgs instead
     */
    export type CustomerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AdminUserDefaultArgs instead
     */
    export type AdminUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminUserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PartnerPropertyDefaultArgs instead
     */
    export type PartnerPropertyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PartnerPropertyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PartnerRoomDefaultArgs instead
     */
    export type PartnerRoomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PartnerRoomDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BookingDefaultArgs instead
     */
    export type BookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BookingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaymentSubmissionDefaultArgs instead
     */
    export type PaymentSubmissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaymentSubmissionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RefundRequestDefaultArgs instead
     */
    export type RefundRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RefundRequestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReviewDefaultArgs instead
     */
    export type ReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReviewDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SecurityAuditLogDefaultArgs instead
     */
    export type SecurityAuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SecurityAuditLogDefaultArgs<ExtArgs>

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