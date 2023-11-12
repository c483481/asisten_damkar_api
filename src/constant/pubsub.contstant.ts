interface PubsubEvent {
    pushFireLocation: symbol;
}

export const pubsubEvent: PubsubEvent = {
    pushFireLocation: Symbol("pushFL"),
};
