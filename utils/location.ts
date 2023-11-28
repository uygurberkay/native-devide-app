const LOCATIONIQ_KEY = 'pk.ea18e86c722c002992b0c22a7399f665';

export const getAddress = async (lat: number, long: number) => {
    const url = `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_KEY}&lat=${lat}&lon=${long}&format=json`
    const response = await fetch(url);

    if(!response.ok){
        throw new Error('Failed  to fetch address!')
    }

    const data = await response.json()
    console.log(data)
    const address = data.display_name
    return address;
}
