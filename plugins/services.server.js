export default async ({store}) => 
{
    await store.dispatch('getlandingPages')
    await store.dispatch('getHome')
    await store.dispatch('gethomeMenus')
    await store.dispatch('gethomeFeatures')
    await store.dispatch('gettilePosts')
}