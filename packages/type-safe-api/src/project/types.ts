/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import { Project } from "projen";
import { JavaProject } from "projen/lib/java";
import { PythonProject } from "projen/lib/python";
import { TypeScriptProject } from "projen/lib/typescript";
import { JavaProjectOptions } from "./java-project-options";
import { JavaVersion, NodeVersion, PythonVersion } from "./languages";
import { OpenApiAsyncModelProject } from "./model/openapi/open-api-async-model-project";
import { OpenApiModelProject } from "./model/openapi/open-api-model-project";
import { SmithyAsyncModelProject } from "./model/smithy/smithy-async-model-project";
import { SmithyModelProject } from "./model/smithy/smithy-model-project";
import { TypeSpecAsyncModelProject } from "./model/type-spec/type-spec-async-model-project";
import { TypeSpecModelProject } from "./model/type-spec/type-spec-model-project";
import { SmithyProjectDefinitionOptions } from "./model/smithy/smithy-project-definition";
import { PythonProjectOptions } from "./python-project-options";
import { TypeScriptProjectOptions } from "./typescript-project-options";

/**
 * The model definition language
 */
export enum ModelLanguage {
  /**
   * Smithy
   * @see https://smithy.io/2.0/
   */
  SMITHY = "SMITHY",
  /**
   * OpenAPI
   * @see https://www.openapis.org/
   */
  OPENAPI = "OPENAPI",
  /**
   * TypeSpec
   * @see https://typespec.io/
   */
  TYPESPEC = "TYPESPEC",
}

/**
 * Represents an instruction set architecture
 */
export enum Architecture {
  /**
   * 64-bit x86 architecture
   */
  X86_64 = "X86_64",
  /**
   * 64-bit ARM architecture
   */
  ARM_64 = "ARM_64",
}

/**
 * Options for a Smithy model
 */
export interface SmithyModelOptions extends SmithyProjectDefinitionOptions {
  /**
   * Smithy service name
   */
  readonly serviceName: SmithyServiceName;
}

/**
 * Options for the OpenAPI model
 */
export interface OpenApiModelOptions {
  /**
   * The title in the OpenAPI specification
   */
  readonly title: string;
}

/**
 * Options for the TypeSpec model
 */
export interface TypeSpecModelOptions {
  /**
   * The namespace for your API
   * @see https://typespec.io/docs/language-basics/namespaces/
   * eg. MyApi
   */
  readonly namespace: string;
}

/**
 * Options for models
 */
export interface ModelOptions {
  /**
   * Options for the Smithy model - required when model language is SMITHY
   */
  readonly smithy?: SmithyModelOptions;

  /**
   * Options for the OpenAPI model - required when model language is OPENAPI
   */
  readonly openapi?: OpenApiModelOptions;

  /**
   * Options for the TypeSpec model - required when the model language is TYPESPEC.
   */
  readonly typeSpec?: TypeSpecModelOptions;
}

/**
 * Options for a code project generated with OpenAPI Generator
 */
export interface GeneratedProjectOptions {
  /**
   * Whether to commit the code generated by the OpenAPI Generator.
   * @default false
   */
  readonly commitGeneratedCode?: boolean;
}

/**
 * Options for configuring a generated typescript runtime project
 */
export interface GeneratedTypeScriptRuntimeOptions
  extends TypeScriptProjectOptions,
    GeneratedProjectOptions {}

/**
 * Options for configuring a generated python runtime project
 */
export interface GeneratedPythonRuntimeOptions
  extends PythonProjectOptions,
    GeneratedProjectOptions {}

/**
 * Options for configuring a generated java runtime project
 */
export interface GeneratedJavaRuntimeOptions
  extends JavaProjectOptions,
    GeneratedProjectOptions {}

/**
 * Options for generating mock data
 */
export interface MockResponseDataGenerationOptions {
  /**
   * Set to true to disable generating mock data
   * @default false
   */
  readonly disable?: boolean;
  /**
   * Locale of generated data
   * @see https://fakerjs.dev/guide/localization.html#available-locales
   * @default en
   */
  readonly locale?: string;
  /**
   * Maximum length of generated arrays
   * @default 3
   */
  readonly maxArrayLength?: number;
  /**
   * Seed for faker to generate data with
   * @default 1337
   */
  readonly seed?: number;
}

/**
 * Options for generating mock data
 */
export interface MockResponseGenerationOptions {
  /**
   * Options for the generated mock response data
   */
  readonly mockDataOptions?: MockResponseDataGenerationOptions;
}

/**
 * Options for configuring a generated typescript infrastructure project
 */
export interface GeneratedTypeScriptInfrastructureOptions
  extends TypeScriptProjectOptions,
    GeneratedProjectOptions,
    MockResponseGenerationOptions {}

/**
 * Options for configuring a generated python infrastructure project
 */
export interface GeneratedPythonInfrastructureOptions
  extends PythonProjectOptions,
    GeneratedProjectOptions,
    MockResponseGenerationOptions {}

/**
 * Options for configuring a generated java infrastructure project
 */
export interface GeneratedJavaInfrastructureOptions
  extends JavaProjectOptions,
    GeneratedProjectOptions,
    MockResponseGenerationOptions {}

/**
 * Options for configuring a generated typescript handlers project
 */
export interface GeneratedTypeScriptHandlersOptions
  extends TypeScriptProjectOptions,
    GeneratedProjectOptions {
  /**
   * Globs for lambda handler entry points, used by esbuild
   * @default src/*.ts - all files directly under the src directory
   */
  readonly handlerEntryPoints?: string[];

  /**
   * Runtime version to target for the handlers
   * @default NodeVersion.NODE_18
   */
  readonly runtimeVersion?: NodeVersion;
}

/**
 * Options for configuring a generated python handlers project
 */
export interface GeneratedPythonHandlersOptions
  extends PythonProjectOptions,
    GeneratedProjectOptions {
  /**
   * The architecture to target for python handlers.
   * This determines the --platform argument passed to the pip install command used to build the lambda distributable.
   * @see https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-native-libraries
   * @default Architecture.X86_64
   */
  readonly architecture?: Architecture;

  /**
   * Runtime version to target for the handlers
   * @default PythonVersion.PYTHON_3_11
   */
  readonly runtimeVersion?: PythonVersion;
}

/**
 * Options for configuring a generated java handlers project
 */
export interface GeneratedJavaHandlersOptions
  extends JavaProjectOptions,
    GeneratedProjectOptions {
  /**
   * Runtime version to target for the handlers
   * @default JavaVersion.JAVA_17
   */
  readonly runtimeVersion?: JavaVersion;
}

/**
 * Options for configuring a generated typescript hooks library project
 */
export interface GeneratedTypeScriptReactQueryHooksOptions
  extends TypeScriptProjectOptions,
    GeneratedProjectOptions {}

/**
 * Options for configuring a generated typescript websocket client library project
 */
export interface GeneratedTypeScriptWebSocketClientOptions
  extends TypeScriptProjectOptions,
    GeneratedProjectOptions {}

/**
 * Options for configuring a generated typescript websocket client library project
 */
export interface GeneratedTypeScriptWebSocketHooksOptions
  extends TypeScriptProjectOptions,
    GeneratedProjectOptions {}

/**
 * Options for generated runtimes
 */
export interface GeneratedRuntimeCodeOptions {
  /**
   * Options for a generated typescript project. These override the default inferred options.
   */
  readonly typescript?: GeneratedTypeScriptRuntimeOptions;
  /**
   * Options for a generated python project. These override the default inferred options.
   */
  readonly python?: GeneratedPythonRuntimeOptions;
  /**
   * Options for a generated java project. These override the default inferred options.
   */
  readonly java?: GeneratedJavaRuntimeOptions;
}

/**
 * Options for generated infrastructure
 */
export interface GeneratedInfrastructureCodeOptions {
  /**
   * Options for the generated typescript infrastructure project. These override the default inferred options.
   */
  readonly typescript?: GeneratedTypeScriptInfrastructureOptions;
  /**
   * Options for the generated python infrastructure project. These override the default inferred options.
   */
  readonly python?: GeneratedPythonInfrastructureOptions;
  /**
   * Options for the generated java infrastructure project. These override the default inferred options.
   */
  readonly java?: GeneratedJavaInfrastructureOptions;
}

/**
 * Options for lambda handler projects for implementing API operations
 */
export interface GeneratedHandlersCodeOptions {
  /**
   * Options for the typescript handlers project. These override the default inferred options.
   */
  readonly typescript?: GeneratedTypeScriptHandlersOptions;
  /**
   * Options for the python handlers project. These override the default inferred options.
   */
  readonly python?: GeneratedPythonHandlersOptions;
  /**
   * Options for the java handlers project. These override the default inferred options.
   */
  readonly java?: GeneratedJavaHandlersOptions;
}

/**
 * Collections of projects managed by type-safe-api
 */
export interface ProjectCollections {
  /**
   * Array of all projects managed by type-safe-api
   */
  readonly projects: Project[];
  /**
   * Array of all model projects
   */
  readonly model: Project[];
  /**
   * Array of all runtime projects
   */
  readonly runtimes: Project[];
  /**
   * Array of all infrastructure projects
   */
  readonly infrastructure: Project[];
  /**
   * Array of all library projects
   */
  readonly libraries: Project[];
  /**
   * Array of all documentation projects
   */
  readonly documentation: Project[];
  /**
   * Array of all handler projects
   */
  readonly handlers: Project[];
}

/**
 * Generated code projects
 */
export interface GeneratedCodeProjects {
  /**
   * Generated typescript project
   */
  readonly typescript?: TypeScriptProject;
  /**
   * Generated python project
   */
  readonly python?: PythonProject;
  /**
   * Generated java project
   */
  readonly java?: JavaProject;
}

/**
 * Common details for API model projects
 */
export interface ModelProjectDetails {
  /**
   * Name of the API
   */
  readonly apiName: string;
  /**
   * Name of the bundled OpenAPI specification file
   */
  readonly parsedSpecFile: string;
  /**
   * Directory of the model project
   */
  readonly outdir: string;
}

/**
 * Model project references
 */
export interface ModelProject extends ModelProjectDetails {
  /**
   * Reference to the Smithy model project. Will be defined if the model language is Smithy
   */
  readonly smithy?: SmithyModelProject;

  /**
   * Reference to the OpenAPI model project. Will be defined if the model language is OpenAPI
   */
  readonly openapi?: OpenApiModelProject;

  /**
   * Reference to the TypeSpec model project. Will be defined if the model language is TypeSpec
   */
  readonly typeSpec?: TypeSpecModelProject;
}

/**
 * WebSocket model project references
 */
export interface WebSocketModelProject extends ModelProjectDetails {
  /**
   * File name of the generated async api specification
   */
  readonly asyncApiSpecFile: string;

  /**
   * Reference to the Smithy model project. Will be defined if the model language is Smithy
   */
  readonly smithy?: SmithyAsyncModelProject;

  /**
   * Reference to the OpenAPI model project. Will be defined if the model language is OpenAPI
   */
  readonly openapi?: OpenApiAsyncModelProject;

  /**
   * Reference to the TypeSpec model project. Will be defined if the model language is TypeSpec
   */
  readonly typeSpec?: TypeSpecAsyncModelProject;
}

/**
 * Options for generated libraries
 */
export interface GeneratedLibraryOptions {
  /**
   * Options for the generated typescript react-query hooks library. These override the default inferred options.
   */
  readonly typescriptReactQueryHooks?: GeneratedTypeScriptReactQueryHooksOptions;
}

export interface GeneratedWebSocketLibraryOptions {
  /**
   * Options for the generated typescript websocket client library. These override the default inferred options.
   */
  readonly typescriptWebSocketClient?: GeneratedTypeScriptWebSocketClientOptions;
  /**
   * Options for the generated typescript websocket hooks library. These override the default inferred options.
   */
  readonly typescriptWebSocketHooks?: GeneratedTypeScriptWebSocketHooksOptions;
}

/**
 * Generated library projects
 */
export interface GeneratedLibraryProjects {
  /**
   * Generated typescript react-query hooks project
   */
  readonly typescriptReactQueryHooks?: TypeScriptProject;
}

/**
 * Generated websocket library projects
 */
export interface GeneratedWebSocketLibraryProjects {
  /**
   * Generated typescript websocket client project
   */
  readonly typescriptWebSocketClient?: TypeScriptProject;

  /**
   * Generated typescript websocket hooks project
   */
  readonly typescriptWebSocketHooks?: TypeScriptProject;
}

/**
 * Options for the html redoc documentation project
 */
export interface GeneratedHtmlRedocDocumentationOptions
  extends GeneratedProjectOptions {}

/**
 * Options for the html2 documentation project
 */
export interface GeneratedHtml2DocumentationOptions
  extends GeneratedProjectOptions {}

/**
 * Options for the markdown documentation project
 */
export interface GeneratedMarkdownDocumentationOptions
  extends GeneratedProjectOptions {}

/**
 * Options for the plantuml documentation project
 */
export interface GeneratedPlantumlDocumentationOptions
  extends GeneratedProjectOptions {}

/**
 * Options for the async api html documentation project
 */
export interface GeneratedAsyncApiHtmlDocumentationOptions
  extends GeneratedProjectOptions {}

/**
 * Options for the async api markdown documentation project
 */
export interface GeneratedAsyncApiMarkdownDocumentationOptions
  extends GeneratedProjectOptions {}

/**
 * Options for generated documentation projects
 */
export interface GeneratedDocumentationOptions {
  /**
   * Generated html redoc documentation project options
   */
  readonly htmlRedoc?: GeneratedHtmlRedocDocumentationOptions;
  /**
   * Generated markdown documentation project options
   */
  readonly markdown?: GeneratedMarkdownDocumentationOptions;
  /**
   * Generated plantuml documentation project options
   */
  readonly plantuml?: GeneratedPlantumlDocumentationOptions;
}

/**
 * Options for generated websocket documentation projects
 */
export interface GeneratedWebSocketDocumentationOptions {
  /**
   * Generated AsyncAPI html documentation project options
   */
  readonly html?: GeneratedAsyncApiHtmlDocumentationOptions;
  /**
   * Generated AsyncAPI markdown documentation project options
   */
  readonly markdown?: GeneratedAsyncApiMarkdownDocumentationOptions;
}

/**
 * Generated documentation project references
 */
export interface GeneratedDocumentationProjects {
  /**
   * Generated html redoc documentation project
   */
  readonly htmlRedoc?: Project;
  /**
   * Generated markdown documentation project
   */
  readonly markdown?: Project;
  /**
   * Generated plantuml documentation project
   */
  readonly plantuml?: Project;
}

export interface GeneratedWebSocketDocumentationProjects {
  /**
   * Generated AsyncAPI html documentation project
   */
  readonly html?: Project;
  /**
   * Generated AsyncAPI markdown documentation project
   */
  readonly markdown?: Project;
}

/**
 * Represents a fully qualified name of a Smithy service.
 * @see https://awslabs.github.io/smithy/2.0/spec/service-types.html
 */
export interface SmithyServiceName {
  /**
   * The service namespace. Nested namespaces are separated by '.', for example com.company
   * @see https://awslabs.github.io/smithy/2.0/spec/model.html#shape-id
   */
  readonly namespace: string;
  /**
   * The service name. Should be PascalCase, for example HelloService
   * @see https://awslabs.github.io/smithy/2.0/spec/model.html#shape-id
   */
  readonly serviceName: string;
}

/**
 * Options for the source files used for code generation
 */
export interface CodeGenerationSourceOptions {
  /**
   * Path to the OpenAPI specification
   */
  readonly specPath: string;
}
