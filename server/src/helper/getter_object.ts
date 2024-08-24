import { get, isNil } from "lodash";

function getterObject<
    TObject extends object, TKey extends keyof TObject, TDefult>
    (object: TObject | null | undefined,
        path?: TKey | [TKey] | string,
        defaultValue?: TDefult
    ): TObject | null | undefined {
    if (isNil(path) || path === '') {
        return object
    }
    return get(object, path, defaultValue)

}

export default getterObject