

export async function getServerSideProps(number) {
    const res = await fetch(`https://randomuser.me/api/?results=${number}&inc=gender,name,email,picture`)
    const data = await res.json()
    if (!data) {
        return {
            notFound: true,
        }
    }

    return data

}
