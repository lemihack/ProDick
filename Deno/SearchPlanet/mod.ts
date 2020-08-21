import { join } from "https://deno.land/std@0.63.0/path/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";

interface Planet {
    [key: string] : string
}

async function loadCsv() {
    const paths = join("files", "cumulative_2020.08.05_22.01.45.csv")
    const file = await Deno.open(paths)
    const bufReader = new BufReader(file)
    const result = await parse(bufReader,{
        header: true,
        comment: "#",
    })
    
    Deno.close(file.rid)

    // console.log(result);

    const finalPlanets = (result as Array<Planet>).filter( (planet) => {
        const planetaryRds = Number(planet["koi_prad"])
        const stellarMass = Number(planet['koi_smass'])
        const stellarRds = Number(planet['koi_srad'])

        return planet["koi_disposition"] === "CONFIRMED"
        // && planetaryRds > 0.5 && planetaryRds < 1.5 
        // && stellarMass > 0.78 && stellarMass < 1.04
        // && stellarRds > 0.99 && stellarRds < 1.01;
    })
    
    return finalPlanets



}

const NewEarth = await loadCsv()
console.log(` Successfully found ${NewEarth.length} new Earth like Planets.`);


//exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative