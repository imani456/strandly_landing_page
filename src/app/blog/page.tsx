import React, { useEffect, useState, useMemo } from 'react';
import { directusFetch } from '@/lib/directus';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  TrendingUp,
  ArrowRight,
  Grid3X3,
  List,
  SortAsc
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  titles: string;
  slugs: string;
  content: string | null;
  featured_image: string | null;
  tags: { post_tags_id: { name: string } }[];
  meta_description: string | null;
  author: { id: string; first_name: string; last_name: string };
  published_at: string;
  category?: { id: string; name: string };
  reading_time?: number;
}

interface PostTag {
  id: number;
  name: string;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postTags, setPostTags] = useState<PostTag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 9;

  // Calculate reading time
  const calculateReadingTime = (content: string | null | undefined) => {
    if (!content) return 1; // Default to 1 minute if no content
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts and tags in parallel
        const [postsResponse, tagsResponse] = await Promise.all([
          directusFetch(
            '/items/posts?filter[titles][_nnull]=true&fields=id,titles,slugs,content,featured_image,tags.post_tags_id.name,meta_description,author.first_name,author.last_name,published_at,category.name'
          ),
          directusFetch('/items/post_tags')
        ]);
        
        if (postsResponse && postsResponse.data) {
          const postsWithReadingTime = (postsResponse.data as Post[]).map(post => ({
            ...post,
            reading_time: calculateReadingTime(post.content)
          }));
          setPosts(postsWithReadingTime);
        } else {
          setError('No posts found.');
        }

        if (tagsResponse && tagsResponse.data) {
          setPostTags(tagsResponse.data as PostTag[]);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
        
        // Fallback data for development when API is not available
        if (import.meta.env.DEV) {
          console.log('Using fallback data for development');
          const fallbackPosts: Post[] = [
            {
              id: '1',
              titles: 'Weekly Streak: Maintained a 7-day activity streak',
              slugs: 'weekly-streak-maintained-7-day-activity-streak',
              content: '<h2>Introduction</h2><p>This is a sample blog post about maintaining a weekly streak. In this article, we\'ll explore the benefits of consistency and how it can help you achieve your goals.</p><h3>Key Benefits</h3><ul><li>Improved consistency</li><li>Better habit formation</li><li>Increased motivation</li></ul><p>Remember, consistency is key to success in any endeavor.</p>',
              featured_image: null,
              tags: [{ post_tags_id: { name: 'Lifestyle' } }, { post_tags_id: { name: 'Habits' } }],
              meta_description: 'Learn how to maintain a consistent weekly streak and build better habits.',
              author: { id: '1', first_name: 'John', last_name: 'Doe' },
              published_at: '2024-01-15T10:00:00Z',
              category: { id: '1', name: 'Lifestyle' },
              reading_time: 3
            },
            {
              id: '2',
              titles: 'The Art of Hair Care: A Complete Guide',
              slugs: 'art-of-hair-care-complete-guide',
              content: '<h2>Understanding Your Hair Type</h2><p>Every hair type requires different care approaches. Understanding your specific hair type is the first step towards proper hair care.</p><h3>Hair Care Tips</h3><ol><li>Use the right shampoo for your hair type</li><li>Condition regularly</li><li>Protect from heat damage</li><li>Maintain a healthy diet</li></ol>',
              featured_image: null,
              tags: [{ post_tags_id: { name: 'Hair Care' } }, { post_tags_id: { name: 'Beauty' } }],
              meta_description: 'A comprehensive guide to proper hair care techniques and tips.',
              author: { id: '2', first_name: 'Jane', last_name: 'Smith' },
              published_at: '2024-01-10T14:30:00Z',
              category: { id: '2', name: 'Beauty' },
              reading_time: 5
            }
          ];
          
          const fallbackTags: PostTag[] = [
            { id: 1, name: 'Afro Hair' },
            { id: 2, name: 'Styling' },
            { id: 3, name: 'Academies' },
            { id: 4, name: 'Salons' },
            { id: 5, name: 'Europe' }
          ];
          
          const postsWithReadingTime = fallbackPosts.map(post => ({
            ...post,
            reading_time: calculateReadingTime(post.content)
          }));
          setPosts(postsWithReadingTime);
          setPostTags(fallbackTags);
        } else {
        setError('Failed to load blog posts.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = posts.map(post => post.category?.name).filter(Boolean);
    return ['all', ...Array.from(new Set(cats))];
  }, [posts]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      const matchesSearch = post.titles.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.meta_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || post.category?.name === selectedCategory;
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(selectedTag => 
                           post.tags.some(tag => tag.post_tags_id.name === selectedTag)
                         );
      return matchesSearch && matchesCategory && matchesTags;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
        case 'oldest':
          return new Date(a.published_at).getTime() - new Date(b.published_at).getTime();
        case 'title':
          return a.titles.localeCompare(b.titles);
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, searchQuery, selectedCategory, selectedTags, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  if (loading) {
  return (
    <div className="bg-background min-h-screen py-10">
      <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Hero Skeleton */}
            <div className="text-center mb-12">
              <Skeleton className="h-16 w-96 mx-auto mb-4" />
              <Skeleton className="h-6 w-64 mx-auto mb-8" />
              <Skeleton className="h-12 w-80 mx-auto" />
            </div>
            
            {/* Filters Skeleton */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <Skeleton className="h-10 w-full md:w-80" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
            
            {/* Posts Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background min-h-screen py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8">
              <CardContent className="space-y-4">
                <div className="text-6xl">😕</div>
                <h1 className="text-2xl font-bold text-red-600">Oops! Something went wrong</h1>
                <p className="text-muted-foreground">{error}</p>
                <Button onClick={() => window.location.reload()} className="mt-4">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#e7cfb1] min-h-screen">
      {/* Hero Sliver Section */}
      <div className="relative min-h-[450px] md:min-h-[550px] lg:min-h-[650px] flex items-center overflow-hidden"
        style={{
          clipPath: 'ellipse(120% 70% at 50% 0%)'
        }}
      >
        {/* Background Image with Strandly Brown Overlay */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://hips.hearstapps.com/cosmouk.cdnds.net/17/06/1486736459-gettyimages-455965570.jpg?resize=1200:*')`
            }}
          />
          {/* Strandly Brown overlay */}
          <div className="absolute inset-0 bg-[#6B3F1D]/80" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-2xl font-prata">
              Our Blog
            </h1>
            <p className="text-lg md:text-xl text-[#F5F0E8] mb-8 max-w-2xl mx-auto drop-shadow-lg">
              Discover insights, tips, and stories from our team. Stay updated with the latest trends and best practices in afro hair care.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-[#F5F0E8]/80">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>{posts.length} Articles</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Updated Weekly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

       <div className="py-0 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Tag Filter Section */}
            {postTags.length > 0 && (
              <div className="mb-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Filter className="h-4 w-4 text-[#6B3F1D]" />
                  <span className="text-sm font-medium text-[#6B3F1D]">Filter by tags:</span>
                  {selectedTags.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTags([])}
                      className="text-xs text-[#6B3F1D]/70 hover:text-[#6B3F1D] hover:bg-[#6B3F1D]/10"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  {postTags.map((tag) => (
                    <Button
                      key={tag.id}
                      variant={selectedTags.includes(tag.name) ? "default" : "outline"}
                      onClick={() => {
                        setSelectedTags(prev => 
                          prev.includes(tag.name) 
                            ? prev.filter(t => t !== tag.name)
                            : [...prev, tag.name]
                        );
                      }}
                      className={`text-sm ${
                        selectedTags.includes(tag.name)
                          ? "bg-[#6B3F1D] text-white hover:bg-[#8B4513]" 
                          : "bg-[#e7cfb1] border-[#6B3F1D]/30 text-[#6B3F1D] hover:bg-[#6B3F1D]/10"
                      }`}
                    >
                      {tag.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Search and Filters */}
            <div className="mb-12">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-lg bg-[#e7cfb1] border-[#6B3F1D]/30 focus:border-[#6B3F1D] focus:ring-[#6B3F1D] text-[#6B3F1D]"
                  />
                </div>
                
                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className={`capitalize ${
                        selectedCategory === category 
                          ? "bg-[#6B3F1D] text-white hover:bg-[#8B4513]" 
                          : "bg-[#e7cfb1] border-[#6B3F1D]/30 text-[#6B3F1D] hover:bg-[#6B3F1D]/10"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sort and View Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <SortAsc className="h-4 w-4" />
                    <span className="text-sm font-medium">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title')}
                      className="px-3 py-1 border border-[#6B3F1D]/30 rounded-md text-sm bg-[#e7cfb1] text-[#6B3F1D] focus:border-[#6B3F1D] focus:ring-[#6B3F1D]"
                    >
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                      <option value="title">Title</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {filteredAndSortedPosts.length} of {posts.length} articles
                  </span>
                  <div className="flex border border-[#6B3F1D]/30 rounded-lg bg-[#e7cfb1]">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' ? 'bg-[#6B3F1D] text-white hover:bg-[#8B4513]' : 'text-[#6B3F1D] hover:bg-[#6B3F1D]/10'}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 'bg-[#6B3F1D] text-white hover:bg-[#8B4513]' : 'text-[#6B3F1D] hover:bg-[#6B3F1D]/10'}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Grid/List */}
            {paginatedPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedTags([]);
                  }}
                  className="bg-[#6B3F1D] text-white hover:bg-[#8B4513]"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 max-w-4xl mx-auto'
              }`}>
                {paginatedPosts.map((post) => (
                  <Link to={`/blog/${post.slugs}`} key={post.id} className="group">
                    <Card className={`h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-[#e7cfb1] border-[#6B3F1D]/30 ${
                      viewMode === 'list' ? 'flex-row' : ''
                    }`}>
                      {/* Featured Image */}
                      <div className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'w-80 h-48' : 'h-48'
                      }`}>
                {post.featured_image ? (
                  <img
                    src={`https://strandly.onrender.com/assets/${post.featured_image}`}
                    alt={post.titles}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#e7cfb1] to-[#6B3F1D]/20 flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-[#6B3F1D]" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          {post.category && (
                            <Badge className="bg-[#6B3F1D]/10 text-[#6B3F1D] hover:bg-[#6B3F1D]/20 border-[#6B3F1D]/30">
                              {post.category.name}
                            </Badge>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <CardHeader className="pb-2">
                          <CardTitle className="line-clamp-2 group-hover:text-[#8B4513] transition-colors duration-200 font-prata">
                            {post.titles}
                          </CardTitle>
                          
                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag.post_tags_id.name} className="text-xs bg-[#6B3F1D] text-[#e7cfb1] hover:bg-[#8B4513] rounded-full px-3 py-1 font-medium">
                        {tag.post_tags_id.name}
                      </Badge>
                    ))}
                              {post.tags.length > 3 && (
                                <Badge className="text-xs bg-[#e7cfb1] text-[#6B3F1D] border-[#6B3F1D]/30 hover:bg-[#6B3F1D]/10 rounded-full px-3 py-1 font-medium">
                                  +{post.tags.length - 3} more
                                </Badge>
                              )}
                  </div>
                          )}
                </CardHeader>

                        <CardContent className="flex-1 pb-1 min-h-[80px]">
                          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                            {post.meta_description || (post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 'No description available')}
                  </p>
                </CardContent>

                        <CardFooter className="pt-3 pb-4">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-3 min-w-0 flex-1">
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarFallback className="text-xs bg-[#6B3F1D] text-white font-semibold">
                                  {post.author?.first_name?.[0]}{post.author?.last_name?.[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-sm min-w-0 flex-1">
                                <p className="font-medium truncate">{post.author?.first_name} {post.author?.last_name}</p>
                                <p className="text-muted-foreground text-xs">
                                  {new Date(post.published_at).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground flex-shrink-0">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{post.reading_time} min</span>
                              </div>
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                            </div>
                  </div>
                </CardFooter>
                      </div>
              </Card>
            </Link>
          ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="bg-[#e7cfb1] border-[#6B3F1D]/30 text-[#6B3F1D] hover:bg-[#6B3F1D]/10 disabled:opacity-50"
                  >
                    Previous
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 ${
                        currentPage === page 
                          ? "bg-[#6B3F1D] text-white hover:bg-[#8B4513]" 
                          : "bg-[#e7cfb1] border-[#6B3F1D]/30 text-[#6B3F1D] hover:bg-[#6B3F1D]/10"
                      }`}
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="bg-[#e7cfb1] border-[#6B3F1D]/30 text-[#6B3F1D] hover:bg-[#6B3F1D]/10 disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </div>
          
          )}
          <div className="my-8 sm:my-10 pb-8 sm:pb-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
