import * as log from "https://deno.land/std@0.63.0/log/mod.ts";

interface Launch {
    flightNumber: number;
    mission: string;
    rocket: string;
    costumer?: Array<string>;
}

const launches = new Map<number, Launch>()

async function loadApi() {
    log.info("Hitting API")
    
    const response = await fetch("https://api.spacexdata.com/v3/launches");
    

    log.warning('You Sucks, Rayan Suck, I Suck, Mahesh Suck')
    console.log("Elon You sucks too, Please Create your official API :( ");
    
    if (!response.ok) {
        log.warning('Failed')
    }
    
    const data = await response.json()
    for (const launch of data) {
        const launchData = {
            flightNumber : launch['flight_number'],
            mission: launch['mission_name'],
            rocket: launch['rocket']['rocket_name'],
            customers: launch['rocket']['second_stage']['payloads'][0]['customers']
        }

         launches.set(launchData.flightNumber,launchData)

         log.info(JSON.stringify(launchData))

    }
    // console.log(launches);
    console.log(`Fetched ${launches.size} Lunches`);
    
    
}

await loadApi();
