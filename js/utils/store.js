// LocalStorage Wrapper for standardizing data access

const STORE_KEY = 'mbti_team_members';

export const store = {
    // Get all registered members
    getMembers() {
        const data = localStorage.getItem(STORE_KEY);
        try {
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error parsing stored members', e);
            return [];
        }
    },

    // Add a new member test result
    addMember(member) {
        // member object expected: { id, name, mbti, date, scores }
        const members = this.getMembers();
        
        // update if member name already exists (simple overwrite logic for same names)
        const existingIndex = members.findIndex(m => m.name === member.name);
        if (existingIndex >= 0) {
            members[existingIndex] = { ...members[existingIndex], ...member, id: members[existingIndex].id };
        } else {
            // Assign a unique ID
            member.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
            members.push(member);
        }
        
        localStorage.setItem(STORE_KEY, JSON.stringify(members));
        return member;
    },

    // Get a specific member by ID
    getMemberById(id) {
        const members = this.getMembers();
        return members.find(m => m.id === id);
    },
    
    // Clear all members (for testing/reset)
    clearMembers() {
        localStorage.removeItem(STORE_KEY);
    }
};
