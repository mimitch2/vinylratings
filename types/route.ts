type NavigateObject = {
    name: string;
    params?: {
        [key: string]: any;
    };
};

type SetOptionsArguments = {
    [key: string]: string | number | boolean;
};

export type Nav = {
    navigate: (value: NavigateObject | string) => void;
    setOptions: (value: SetOptionsArguments) => void;
    setParams: (value: SetOptionsArguments) => void;
    dispatch: (value: any) => void;
};

export type NavState = {
    index: number;
};

type Params = {
    id: string;
    inCollection?: boolean;
    inWantList?: boolean;
    isFromVersions?: boolean;
    instanceId?: number;
    auth?: string;
};

export type Route = {
    params: Params;
};
