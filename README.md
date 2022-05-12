# RSS-project-management-app

## Описание useAxios.

### Аргументы.

1.  defaultRequestOptions - дефолтные опции для запроса. Нужны для get запроса при маунте компонента.
2.  hookOptions - опции для управления хуком. Параметр dontFetchAtMount позволяет отключить запрос при маунте компонента.

### Способы применения.

1. Делаем get запрос при маунте компонента.

const { data, isLoading, isError, request } = useAxios(
{
url: '/boards',
method: 'get',
}
);

2. Делаем POST/PUT/DELETE запрос.
   `const { isLoading, isError, request } = useAxios({});`
   для отправки запроса нужно воспользоваться функцией request

`request({
url: '/boards',
method: 'post',
data: {...}
})`

3. Почти на всех наших страницах нам нужно будет делать сначала get запрос, потом другие запросы, для этого можно в компоненте задать 2 экземпляра useAxios.
   `const { data, isLoading, isError, request } = useAxios(
   {
   url: '/boards',
   method: 'get',
   }
   );`

Во втором экземпляре нужно будет поменять название загрузки, ошибки и запроса.
`const {
isLoading: otherLoading,
isError: otherError,
request: otherRequest,
} = useAxios({});

async function createBoard(value) {
await otherRequest({
url: '/boards',
method: 'post',
data: value
})
setIsModalActive(false)

    request()

}`

Сначала произойдет создание борды. Время пока она создается мы можем обработать с помощью `otherLoading`, ошибку в запросе с помощью `otherError`. Затем закроется модалка и произойдет get запрос который мы обрабатываем с помощью `isLoading и isError`, в функцию нам дополнительно ничего передавать не нужно потому что мы передали все вначале.
