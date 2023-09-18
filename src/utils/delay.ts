export async function delay(timing: number) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, timing);
    })
}