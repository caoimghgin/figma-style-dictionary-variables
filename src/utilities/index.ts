import chroma from 'chroma-js'

export const returnVariableCollection = (name: string, create: boolean): VariableCollection => {
    const collections = figma.variables.getLocalVariableCollections()
    let result = collections.find(item => item.name === name);
    if (!result && create) result = figma.variables.createVariableCollection(name)
    return result!
}

export const getVariables = (collection: any) => {
    return collection?.variableIds.map((id: string) => {
        return figma.variables.getVariableById(id)
    })
}

export const makeVariable = (name: string, collection: any, type: VariableResolvedDataType) => {
    let variable = getVariables(collection).find((item: { name: string }) => item.name === name);
    if (!variable) variable = figma.variables.createVariable(name, collection.id, type)
    return variable
}

export const hexToFigmaColor = (hex: string, alpha: number | null) => {
    const rgba = chroma(hex).rgba()
    return { 
        r: rgba[0] / 255,
        g: rgba[1] / 255, 
        b: rgba[2] / 255, 
        a: (alpha ? alpha/100 : rgba[3]) 
    }
}

export const insertBlackWhiteNeutrals = (column: any) => {
    if (column.semantic === "neutral") {
        // @ts-ignore
        column.rows.unshift({ semantic: "neutral", weight: "000", hex: "#FFFFFF" });
        // @ts-ignore
        column.rows.push({ semantic: "neutral", weight: "950", hex: "#000000" });
    }
}

export const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')