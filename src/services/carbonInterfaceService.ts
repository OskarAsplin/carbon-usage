
const apiKey = process.env.REACT_APP_CARBONINTERFACE_API_KEY;

export const pingCarbonInterface = () => {
    return fetch('https://www.carboninterface.com/api/v1/auth', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + apiKey,
        },
    });
}

export const postCarbonElectricityEstimate = (usage: number, country: string, state?: string) => {
    return fetch('https://www.carboninterface.com/api/v1/estimates', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "type": "electricity",
            "electricity_unit": "mwh",
            "electricity_value": usage,
            "country": country,
            "state": state,
        })
    });
}
