export const daysPassed = (date, birthDate) => {
    const startDate = new Date(birthDate);
    const timeDiff = (startDate) - (date);
    return Math.round(Math.abs(timeDiff / (1000 * 60 * 60 * 24)))
}

export const biorhythmCalc = ({ date, birthDate }) => {
    if (!date)
        date = new Date()
    return {
        physical: Math.sin((2 * Math.PI * daysPassed(date, birthDate)) / 23),
        emotional: Math.sin((2 * Math.PI * daysPassed(date, birthDate)) / 28),
        intellectual: Math.sin((2 * Math.PI * daysPassed(date, birthDate)) / 33),
        intuitive: Math.sin((2 * Math.PI * daysPassed(date, birthDate)) / 38)
    }
}

export const Get30DaysGraphData = (birthDate) => {
    let currentDate = new Date()
    let physical = []
    let emotional = []
    let intellectual = []
    let intuitive = []
    let dates = []

    for (let index = 0; index <= 30; index++) {
        let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 14 + index)
        dates.push(date)
        const biorhythmData = biorhythmCalc({ date, birthDate })
        physical.push([index * 100, (-biorhythmData.physical * 250 + 350)])
        emotional.push([index * 100, (-biorhythmData.emotional * 250 + 350)])
        intellectual.push([index * 100, (-biorhythmData.intellectual * 250 + 350)])
        intuitive.push([index * 100, (-biorhythmData.intuitive * 250 + 350)])
    }

    return {
        physical,
        emotional,
        intellectual,
        intuitive,
        dates
    }
}