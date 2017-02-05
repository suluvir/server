interface Action<T>{
    type: string;
    payload: T;
}

export default Action;
