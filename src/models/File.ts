interface IFakeFile {
  name: string;
  content: string;
}

class FakeFile {
  name: string;
  content: string;
}

const FakeFiles = (() => {
  const files = {} as { [name: string]: FakeFile };

  return {
    keys(): string[] {
      return Object.keys(files);
    },
    values(): Array<FakeFile> {
      return Object.values(files);
    },
    add(file: IFakeFile) {
      files[file.name] = file;
    },
    addAll(newFiles: Array<IFakeFile>) {
      newFiles.forEach(file => this.add(file));
    },
    find(name: string): FakeFile {
      return files[name];
    }
  };
})();

FakeFiles.addAll([
  {
    name: "works.txt",
    content: [
      "https://munky.work",
      "https://slide.munky.work",
      "https://mnist.munky.work",
      "https://ethereum-cv.munky.work"
    ].join("\n")
  }
]);

export { FakeFile, FakeFiles };
