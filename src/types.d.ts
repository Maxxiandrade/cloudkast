interface Location{
     name:string
     region: string
     country: string
}

interface Condition{
     text:string
     icon:string
}
interface Current{
     condition:Condition
}

export interface Data{
     current: Current,
     location: Location
}
