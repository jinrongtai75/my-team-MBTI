// Supabase wrapper for standardizing data access

const supabaseUrl = 'https://hnaiqogmvhzlyiywlpzx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuYWlxb2dtdmh6bHlpeXdscHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MzA2OTgsImV4cCI6MjA4OTIwNjY5OH0._-1rZ7E6683MHbi9t7IUDwXCKUYZLm936Cn4ydMomnI';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

export const store = {
    // Get all registered members asynchronously
    async getMembers() {
        try {
            const { data, error } = await supabase
                .from('team_MBTI_members')
                .select('*')
                .order('created_at', { ascending: false });
                
            if (error) throw error;
            return data || [];
        } catch (e) {
            console.error('Error fetching members from Supabase', e);
            return [];
        }
    },

    // Add a new member test result asynchronously
    async addMember(member) {
        // member object expected: { name, mbti, scores }
        try {
            const { data, error } = await supabase
                .from('team_MBTI_members')
                .insert([
                    { name: member.name, mbti: member.mbti, scores: member.scores }
                ])
                .select();
                
            if (error) throw error;
            return data && data.length > 0 ? data[0] : null;
        } catch (e) {
            console.error('Error saving member to Supabase', e);
            return null;
        }
    },
    
    // Clear all members (for testing/reset)
    async clearMembers() {
        try {
            // This requires RLS policies to allow delete operations
            // As a simple workaround for demo/testing without proper RLS DELETE allow list:
            const { error } = await supabase
                .from('team_MBTI_members')
                .delete()
                .neq('id', 0); // Delete all where id is not 0 (effectively deletes all rows)
                
            if (error) throw error;
            return true;
        } catch (e) {
            console.error('Error clearing members from Supabase', e);
            return false;
        }
    }
};
