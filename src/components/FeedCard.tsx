import { Heart, MessageCircle, MoreVertical, Bookmark } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import type { Post } from "@/lib/store";

import { useState, useEffect } from "react";
import PostActionsSheet from "@/components/PostActionsSheet";
import { useToast } from "@/hooks/use-toast";

interface FeedCardProps {
  post: Post;
  currentUserId?: string;
  isSaved?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onBid?: () => void;
  onSave?: () => void;
  onClick?: () => void;
}

export default function FeedCard({
  post,
  currentUserId,
  isSaved = false,
  onLike,
  onComment,
  onBid,
  onSave,
  onClick,
}: FeedCardProps) {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const [showActionsSheet, setShowActionsSheet] = useState(false);
  const { toast } = useToast();

  const isLiked = currentUserId ? post.likes.includes(currentUserId) : false;
  const truncatedDesc =
    post.description.length > 100
      ? post.description.substring(0, 100) + "..."
      : post.description;

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap());

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  return (
    <Card
      className="overflow-hidden hover-elevate cursor-pointer rounded-none shadow-none"
      data-testid={`card-post-${post.id}`}
    >
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar
              className="w-10 h-10 border-2 border-muted"
              data-testid={`avatar-user-${post.userId}`}
            >
              <AvatarImage src={post.avatar} alt={post.username} />
              <AvatarFallback>{post.username[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p
                className="font-semibold text-sm"
                data-testid={`text-username-${post.id}`}
              >
                {post.username}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString("id-ID")}
              </p>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              setShowActionsSheet(true);
            }}
            data-testid={`button-more-${post.id}`}
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {post.images && post.images.length > 1 ? (
          <div className="relative mb-3">
            <Carousel className="w-full" setApi={setCarouselApi}>
              <CarouselContent>
                {post.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div
                      className="aspect-square rounded-lg overflow-hidden bg-muted"
                      data-testid={`img-post-${post.id}-${index}`}
                    >
                      <img
                        src={image}
                        alt={`${post.description} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    carouselApi?.scrollTo(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === current
                      ? "w-6 bg-primary"
                      : "w-2 bg-background/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div
            className="aspect-square rounded-lg overflow-hidden mb-3 bg-muted"
            data-testid={`img-post-${post.id}`}
          >
            <img
              src={post.images?.[0] || ""}
              alt={post.description}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="mb-3">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {post.categories?.map((category, index) => (
              <Badge
                key={index}
                variant="secondary"
                data-testid={`badge-category-${post.id}-${index}`}
              >
                {category}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <span data-testid={`text-location-${post.id}`}>
              📍 {post.location}
            </span>
            <span data-testid={`text-budget-${post.id}`}>💰 {post.budget}</span>
          </div>
          <p
            className="text-sm leading-relaxed"
            data-testid={`text-description-${post.id}`}
          >
            {showFullDesc ? post.description : truncatedDesc}
            {post.description.length > 100 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullDesc(!showFullDesc);
                }}
                className="text-primary ml-1 font-medium"
                data-testid={`button-show-more-${post.id}`}
              >
                {showFullDesc ? "Sembunyikan" : "Lihat Selengkapnya"}
              </button>
            )}
          </p>
        </div>
      </div>

      <div className="border-t border-card-border px-4 py-3 space-y-2 bg-card/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span data-testid={`text-bid-count-${post.id}`}>
            {post.bids.length} {post.bids.length === 1 ? "pelamar" : "pelamar"}
          </span>
          <span data-testid={`text-interaction-count-${post.id}`}>
            {post.likes.length} suka • {post.comments.length} komentar
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike?.();
              }}
              className="flex items-center gap-1.5 hover-elevate rounded-md px-2 py-1"
              data-testid={`button-like-${post.id}`}
            >
              <Heart
                className={`w-5 h-5 transition-all ${
                  isLiked
                    ? "fill-destructive text-destructive scale-110"
                    : "text-muted-foreground"
                }`}
              />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onComment?.();
              }}
              className="flex items-center gap-1.5 hover-elevate rounded-md px-2 py-1"
              data-testid={`button-comment-${post.id}`}
            >
              <MessageCircle className="w-5 h-5 text-muted-foreground" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSave?.();
              }}
              className="flex items-center gap-1.5 hover-elevate rounded-md px-2 py-1"
              data-testid={`button-save-${post.id}`}
            >
              <Bookmark
                className={`w-5 h-5 transition-all ${
                  isSaved
                    ? "fill-primary text-primary scale-110"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          </div>

          <Button
            size="sm"
            variant="default"
            onClick={(e) => {
              e.stopPropagation();
              onBid?.();
            }}
            data-testid={`button-bid-action-${post.id}`}
          >
            Tawar
          </Button>
        </div>
      </div>

      <PostActionsSheet
        isOpen={showActionsSheet}
        onClose={() => setShowActionsSheet(false)}
        onDetail={() => onClick?.()}
        onReport={() => {
          toast({
            title: "Laporan Dikirim",
            description: "Terima kasih telah melaporkan postingan ini.",
          });
        }}
        onShare={() => {
          if (navigator.share) {
            navigator.share({
              title: post.description,
              text: `Lihat pekerjaan ini di KerjaAja: ${post.description}`,
              url: window.location.href,
            });
          } else {
            navigator.clipboard.writeText(window.location.href);
            toast({
              title: "Link Disalin",
              description: "Link postingan telah disalin ke clipboard.",
            });
          }
        }}
        onSave={() => onSave?.()}
        isSaved={isSaved}
      />
    </Card>
  );
}
