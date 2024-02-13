import { unlinkSync } from "fs"
import { RoseAndNight } from "./night"


function validateTitle(title : string, using : string = '  ') {
    var disallowed = ['/', '\\',':','*','?','\"','<','>','|',':']
    var initialTitle = title
    disallowed.forEach((n) => {
        title = title.replaceAll(n,using)
    })
    // RoseAndNight(`
    // validated title => 
    // @from : ${initialTitle}
    // @to : ${title}
    // `)
    return title
}

function aRose() {
    var uniqued = new Date().getTime().toString();
    // RoseAndNight(`
    // created unique identity => @${uniqued}`)
 
    return uniqued;
  }
  
function clearStorageCatche(paths : Array<string>) {
    paths.forEach((p) => {
        unlinkSync(p)
            RoseAndNight(`storage cleared @path => @${p}`)
    })
}

export {
    validateTitle,
    aRose,
    clearStorageCatche
}