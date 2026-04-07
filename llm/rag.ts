import data from "./ragData.json"

function normalize(str: string) {
    return str
        .toLowerCase()
        .replace(/[^a-zàâçéèêëîïôûùüÿñæœ\s]/g, "");
}

export function findBestMatch(input: string) {
    const words = normalize(input).split(" ");

    let bestIntent = null;
    let bestScore = 0;

    for (const intent of data.intents) 
    {
        let score = 0;

        for (const symptome of intent.symptomes) {
            for (const word of words) {
                if(symptome.includes(word)) {
                    score++;
                }
            }
        }
        if(score > bestScore) {
            bestScore = score;
            bestIntent = intent;
        }
    }
    return bestIntent;
}
