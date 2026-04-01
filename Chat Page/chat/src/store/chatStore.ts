import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChatMessage {
    id: string;
    role: 'user' | 'ai';
    content: string;
    attachment?: string;
}

export interface Project {
    id: string;
    name: string;
    createdAt: number;
}

export interface ChatSession {
    id: string;
    title: string;
    messages: ChatMessage[];
    createdAt: number;
    updatedAt: number;
    isPinned?: boolean;
    projectId?: string | null;
}

export interface UserProfile {
    displayName: string;
    username: string;
    avatarUrl?: string;
}

export interface UserSettings {
    general: {
        appearance: 'System' | 'Light' | 'Dark';
        accentColor: string;
        language: string;
        spokenLanguage: string;
        voice: string;
    };
    notifications: {
        responses: 'Push' | 'Email' | 'Push, Email' | 'Off';
        groupChats: 'Push' | 'Email' | 'Push, Email' | 'Off';
        tasks: 'Push' | 'Email' | 'Push, Email' | 'Off';
        projects: 'Push' | 'Email' | 'Push, Email' | 'Off';
        recommendations: 'Push' | 'Email' | 'Push, Email' | 'Off';
        usage: 'Push' | 'Email' | 'Push, Email' | 'Off';
    };
    dataControls: {
        improveModel: boolean;
    };
    security: {
        authenticatorApp: boolean;
        textMessage: boolean;
    };
}

interface ChatStore {
    sessions: ChatSession[];
    projects: Project[];
    activeSessionId: string | null;
    userProfile: UserProfile;
    userSettings: UserSettings;

    // Session Actions
    createSession: (defaultTitle?: string) => string;
    setActiveSession: (id: string) => void;
    updateSessionTitle: (id: string, newTitle: string) => void;
    addMessage: (sessionId: string, message: ChatMessage) => void;
    updateMessage: (sessionId: string, messageId: string, newContent: string) => void;
    deleteSession: (id: string) => void;
    togglePinSession: (id: string) => void;
    clearAllSessions: () => void;

    // Project Actions
    createProject: (name: string) => string;
    updateProjectName: (id: string, newName: string) => void;
    deleteProject: (id: string) => void;
    moveSessionToProject: (sessionId: string, projectId: string | null) => void;

    // User Profile Actions
    updateUserProfile: (profile: Partial<UserProfile>) => void;

    // User Settings Actions
    updateUserSettings: (category: keyof UserSettings, settings: Partial<UserSettings[keyof UserSettings]>) => void;
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            sessions: [],
            projects: [],
            activeSessionId: null,
            userProfile: {
                displayName: "John Doe",
                username: "johndoe",
            },
            userSettings: {
                general: {
                    appearance: 'System',
                    accentColor: 'Default',
                    language: 'Auto-detect',
                    spokenLanguage: 'Auto-detect',
                    voice: 'Ember',
                },
                notifications: {
                    responses: 'Push',
                    groupChats: 'Push',
                    tasks: 'Push, Email',
                    projects: 'Email',
                    recommendations: 'Push, Email',
                    usage: 'Push, Email',
                },
                dataControls: {
                    improveModel: false,
                },
                security: {
                    authenticatorApp: true,
                    textMessage: false,
                }
            },

            createSession: (defaultTitle = "New Chat") => {
                const newId = Date.now().toString();
                const newSession: ChatSession = {
                    id: newId,
                    title: defaultTitle,
                    messages: [],
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                };

                set((state) => ({
                    sessions: [newSession, ...state.sessions],
                    activeSessionId: newId,
                }));

                return newId;
            },

            setActiveSession: (id: string) => {
                set({ activeSessionId: id });
            },

            updateSessionTitle: (id: string, newTitle: string) => {
                set((state) => ({
                    sessions: state.sessions.map((session) =>
                        session.id === id ? { ...session, title: newTitle, updatedAt: Date.now() } : session
                    ),
                }));
            },

            addMessage: (sessionId: string, message: ChatMessage) => {
                set((state) => ({
                    sessions: state.sessions.map((session) =>
                        session.id === sessionId
                            ? {
                                ...session,
                                messages: [...session.messages, message],
                                updatedAt: Date.now(),
                            }
                            : session
                    ),
                }));
            },

            updateMessage: (sessionId: string, messageId: string, newContent: string) => {
                set((state) => ({
                    sessions: state.sessions.map((session) => {
                        if (session.id !== sessionId) return session;

                        const messageIndex = session.messages.findIndex(m => m.id === messageId);
                        if (messageIndex === -1) return session;

                        // We slice up to the updated message to simulate standard chat 
                        // history edit behaviors (truncating subsequent messages) 
                        // as requested in Phase 5: "Keep all messages up to the edited message"
                        const newMessages = session.messages.slice(0, messageIndex);
                        newMessages.push({ ...session.messages[messageIndex], content: newContent });

                        return {
                            ...session,
                            messages: newMessages,
                            updatedAt: Date.now(),
                        };
                    })
                }));
            },

            deleteSession: (id: string) => {
                set((state) => {
                    const newSessions = state.sessions.filter((s) => s.id !== id);
                    const newActiveId = state.activeSessionId === id
                        ? null
                        : state.activeSessionId;

                    return {
                        sessions: newSessions,
                        activeSessionId: newActiveId,
                    };
                });
            },

            togglePinSession: (id: string) => {
                set((state) => ({
                    sessions: state.sessions.map((session) =>
                        session.id === id ? { ...session, isPinned: !session.isPinned } : session
                    ),
                }));
            },

            clearAllSessions: () => {
                set({ sessions: [], activeSessionId: null });
            },

            createProject: (name: string) => {
                const newId = crypto.randomUUID();
                set((state) => ({
                    projects: [
                        { id: newId, name, createdAt: Date.now() },
                        ...state.projects,
                    ],
                }));
                return newId;
            },

            updateProjectName: (id: string, newName: string) => {
                set((state) => ({
                    projects: state.projects.map((p) =>
                        p.id === id ? { ...p, name: newName } : p
                    ),
                }));
            },

            deleteProject: (id: string) => {
                set((state) => ({
                    projects: state.projects.filter((p) => p.id !== id),
                    // Also unassign sessions from this project
                    sessions: state.sessions.map((s) =>
                        s.projectId === id ? { ...s, projectId: null } : s
                    ),
                }));
            },

            moveSessionToProject: (sessionId: string, projectId: string | null) => {
                set((state) => ({
                    sessions: state.sessions.map((session) =>
                        session.id === sessionId ? { ...session, projectId } : session
                    ),
                }));
            },

            updateUserProfile: (profile: Partial<UserProfile>) => {
                set((state) => ({
                    userProfile: {
                        ...state.userProfile,
                        ...profile
                    }
                }));
            },

            updateUserSettings: (category: keyof UserSettings, settings: Partial<UserSettings[keyof UserSettings]>) => {
                set((state) => ({
                    userSettings: {
                        ...state.userSettings,
                        [category]: {
                            ...state.userSettings[category],
                            ...settings,
                        }
                    }
                }));
            },
        }),
        {
            name: 'hsagic-chat-store', // unique name for localStorage key
        }
    )
);
