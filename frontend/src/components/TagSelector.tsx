import { useEffect, useState } from "react";
import { fetchTags, updateWorkoutTag, createTag } from "@/services/tagService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Tag {
  id: number;
  name: string;
}

interface TagSelectorProps {
  selectedTag: string;
  workoutId: number;
  onTagChange: (tag: string) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTag,
  workoutId,
  onTagChange,
}) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const sessionId = 1;
  const [newTagName, setNewTagName] = useState("");

  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await fetchTags();
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    loadTags();
  }, []);

  const handleTagToggle = async (tag: string) => {
    const newTag = selectedTag === tag ? "" : tag; // Toggle logic
    try {
      await updateWorkoutTag(sessionId, workoutId, newTag);
      onTagChange(newTag);
    } catch (error) {
      console.error("Error updating tag:", error);
    }
  };

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;

    try {
      const newTag = await createTag(newTagName.trim());
      setTags([...tags, newTag]);
      setNewTagName("");
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };

  return (
<div>
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <div
        key={tag.id}
        className={`border rounded-lg p-2 cursor-pointer ${
          selectedTag === tag.name ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        {tag.name}
        <Button
          className="ml-2"
          size="icon"
          variant="outline"
          onClick={() => handleTagToggle(tag.name)}
        >
          {selectedTag === tag.name ? "❌" : "✓"}
        </Button>
      </div>
    ))}
  </div>
  <div className="flex gap-2 items-center">
    <Input
      value={newTagName}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTagName(e.target.value)}
      placeholder="Create your own Tag"
    />
    <Button onClick={handleCreateTag}>Add Tag</Button>
  </div>
</div>
  );
};

export default TagSelector;
