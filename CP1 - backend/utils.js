exports.randomStringGenetator = () => {
    return Math.random().toString(36).slice(2);
}

exports.initialTasks = () => {
    return [
        {
            name: 'Assistir jogo do São Paulo',
            period: 'weekly',
            exp: 50,
            id: '1',
            status: 'toBeDone'
        },
        {
            name: 'Tomar 2L de água',
            period: 'daily',
            exp: 10,
            id: '2',
            status: 'toBeDone'
        },
        {
            name: 'Tomar 2L de águaaaaa',
            period: 'daily',
            exp: 10,
            id: '3',
            status: 'Done'
        },
    ]
}

exports.initialCharacter = () => {
    return {
        name: '',
        level: 0,
        exp: 0,
        needed: 0,
        image: '',

    }
}

exports.characterExp = (character, exp) => {
    let newExp = character.exp + exp;
    let newLevel = character.level;
    let newNeeded = character.needed;
    if (newExp >= character.needed) {
        newLevel += 1;
        newExp -= character.needed;
        newNeeded = 25 * newLevel;
    }
    return {
        name: character.name,
        level: newLevel,
        exp: newExp,
        needed: newNeeded
    }
}


