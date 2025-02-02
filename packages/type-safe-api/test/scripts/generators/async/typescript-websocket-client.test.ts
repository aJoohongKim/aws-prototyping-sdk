/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import os from "os";
import * as path from "path";
import { exec } from "projen/lib/util";
import { TypescriptWebsocketClientLibrary } from "../../../../src/project/codegen/library/typescript-websocket-client-library";
import { withTmpDirSnapshot } from "../../../project/snapshot-utils";

describe("Typescript Async Client Code Generation Script Unit Tests", () => {
  it.each(["single.yaml"])("Generates With %s", (spec) => {
    const specPath = path.resolve(
      __dirname,
      `../../../resources/specs/async/${spec}`
    );

    expect(
      withTmpDirSnapshot(os.tmpdir(), (outdir) => {
        exec(`cp ${specPath} ${outdir}/spec.yaml`, {
          cwd: path.resolve(__dirname),
        });
        const project = new TypescriptWebsocketClientLibrary({
          name: "test",
          defaultReleaseBranch: "main",
          outdir,
          specPath: "spec.yaml",
        });
        exec(
          `${path.resolve(
            __dirname,
            "../../../../scripts/type-safe-api/run.js generate"
          )} ${project.buildGenerateCommandArgs()}`,
          {
            cwd: outdir,
          }
        );
        return {
          excludeGlobs: ["spec.yaml"],
        };
      })
    ).toMatchSnapshot();
  });
});
