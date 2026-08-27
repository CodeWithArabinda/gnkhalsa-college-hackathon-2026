import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import TemplateRenderer from '../components/templates/TemplateRenderer';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

export default function PublicPortfolioPage() {
  const { public_slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicPortfolio = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select(`
            id,
            full_name,
            headline,
            bio,
            profile_image_url,
            location,
            email,
            github_url,
            linkedin_url,
            selected_template,
            is_published,
            public_slug,
            experiences (*),
            education (*),
            projects (*),
            skills (*),
            achievements (*)
          `)
          .eq('public_slug', public_slug)
          .eq('is_published', true)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (data) {
          const sortByDisplayOrder = (arr) => {
            return [...(arr || [])].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
          };

          setPortfolio({
            ...data,
            experiences: sortByDisplayOrder(data.experiences),
            education: sortByDisplayOrder(data.education),
            projects: sortByDisplayOrder(data.projects),
            skills: sortByDisplayOrder(data.skills),
            achievements: sortByDisplayOrder(data.achievements)
          });
        } else {
          setPortfolio(null);
        }
      } catch (err) {
        console.error('Error fetching public portfolio:', err);
        setError(err.message || 'Failed to load portfolio.');
      } finally {
        setLoading(false);
      }
    };

    if (public_slug) {
      fetchPublicPortfolio();
    }
  }, [public_slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF8] flex flex-col items-center justify-center text-slate-800">
        <Loader2 className="w-10 h-10 animate-spin text-black mb-4" />
        <p className="text-sm font-mono font-bold">Retrieving portfolio details...</p>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-[#FFFDF8] text-[#0F172A] font-sans flex flex-col items-center justify-center p-6 border-t-8 border-black">
        <div className="max-w-md w-full bg-white border-3 border-black p-8 rounded-2xl shadow-brutal text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#FF70A6] border-2 border-black flex items-center justify-center text-black font-black text-xl mx-auto shadow-[2px_2px_0px_0px_#000]">
            !
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-heading font-black tracking-tight text-[#0F172A]">Portfolio Private</h1>
            <p className="text-sm font-medium text-slate-600">
              This portfolio is currently private or does not exist. Check with the owner or ensure the link is typed correctly.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-[#FFE600] text-black font-extrabold px-6 py-3 border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Home Page</span>
          </Link>
        </div>
      </div>
    );
  }

  // Render the dynamic selected template
  return <TemplateRenderer portfolio={portfolio} />;
}
