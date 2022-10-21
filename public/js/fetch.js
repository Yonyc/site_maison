async function testFetch() {
    let pendingRes = fetch("/api/login", {
        method: "post",
        body: new URLSearchParams({})
    });

    let res = await pendingRes;

    console.log(await res.text());
}

testFetch();