import type { PlopTypes } from "@turbo/gen";
import fs from "fs-extra";
import path from "path";
// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

// eslint-disable-next-line import/no-default-export -- Turbo generators require default export
export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a create a new docs cheat sheet
  plop.setGenerator("cs", {
    description: "",
    prompts: [
      {
        type: "input",
        name: "type",
        message: "Type of group for the cheat sheet (e.g. git, linux, etc):",
      },
      {
        type: "input",
        name: "name",
        message:
          "Name of the cheat sheet (e.g. git commit, linux commands, etc):",
      },
      {
        type: "input",
        name: "title",
        message: "Title of the cheat sheet:",
      },
      {
        type: "input",
        name: "excerpt",
        message: "Short summary of the cheat sheet:",
      },
    ],
    actions: function (data) {
      if (!data?.name || !data?.type) {
        throw new Error("Name and type are required");
      }

      const RootDir = "../../content/docs/500-cheat-sheet/";
      // ensure both dirName and fileName are lowercase and have no spaces should be "kebab-case"
      const dirName = data.type.toLowerCase().replace(/\s/g, "-");
      const fileName = data.name.toLowerCase().replace(/\s/g, "-");

      const dirs = fs.readdirSync(path.resolve(__dirname, RootDir));
      let dirExists = false;
      let dirNumber = -1;
      let fileNumber = -1;

      dirs.forEach((file: string) => {
        if (file.includes(dirName)) {
          dirExists = true;
          dirNumber = parseInt(file.split("-")[0]);
        }
      });

      const actions = [];

      if (dirExists) {
        const files = fs.readdirSync(
          path.resolve(__dirname, `${RootDir}${dirNumber}-${dirName}`),
        );

        let tmpFileNumber = -1;
        files.forEach((file: string) => {
          const fileNumber = parseInt(file.split("-")[0]);
          if (fileNumber > tmpFileNumber) {
            tmpFileNumber = fileNumber;
          }
        });
        fileNumber = tmpFileNumber + 1;

        actions.push({
          type: "add",
          path: `content/docs/500-cheat-sheet/${dirNumber}-${dirName}/${fileNumber}-${fileName}.mdx`,
          templateFile: "templates/doc.hbs",
        });
        return actions;
      }

      // Generate the number for the directory
      let tmpDirNumber = -1;
      dirs.forEach((file: string) => {
        const dirNumber = parseInt(file.split("-")[0]);
        if (dirNumber > tmpDirNumber) {
          tmpDirNumber = dirNumber;
        }
      });
      dirNumber = tmpDirNumber + 1;

      fileNumber = 100;

      actions.push({
        type: "add",
        path: `content/docs/500-cheat-sheet/${dirNumber}-${dirName}/${fileNumber}-${fileName}.mdx`,
        templateFile: "templates/doc.hbs",
      });

      // Create the index.mdx file
      actions.push({
        type: "add",
        path: `content/docs/500-cheat-sheet/${dirNumber}-${dirName}/index.mdx`,
        templateFile: "templates/index.hbs",
      });

      return actions;
    },
  });
}
