import Action from '../actions/action';

export function test(state: string = "test", action: Action<string>): string {
    return state;
}
