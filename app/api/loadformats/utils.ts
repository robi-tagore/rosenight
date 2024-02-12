import { unlinkSync } from "fs";
import { RoseAndNight } from "./night";

function bitToMb(bits: Array<string>): string {
  var Ebit: number = 0;

  bits.forEach((b) => {
    Ebit += Number(b);
  });

  var mb = Ebit / 1000000;
  var pointless = String(mb).split(".")[0] + "mb";



  return pointless;
}

function validateTitle(title: string, using: string = "  ") {
  var disallowed = ["/", "\\", ":", "*", "?", '"', "<", ">", "|", ":"];
  var initialTitle = title;
  disallowed.forEach((n) => {
    title = title.replaceAll(n, using);
  });
  RoseAndNight(`
    validated title => 
    @from : ${initialTitle}
    @to : ${title}
    `);
  return title;
}

function aRose() {
  var uniqued = new Date().getTime().toString();
  RoseAndNight(`
    created unique identity => @${uniqued}`);

  return uniqued;
}

function clearStorageCatche(paths: Array<string>) {
  paths.forEach((p) => {
    unlinkSync(p);
  });
}

export { validateTitle, aRose, clearStorageCatche, bitToMb };
