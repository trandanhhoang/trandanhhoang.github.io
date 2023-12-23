
https://codegym.cc/groups/posts/213-features-of-phantomreference

StrongReference (ordinary references that we create when creating an object):
Cat cat = new Cat()

SoftReference (soft references):
https://codegym.cc/quests/lectures/questcollections.level04.lecture03
Example
// Create a Cat object
Cat cat = new Cat();

// Create a soft reference to a Cat object
SoftReference<Cat> catRef = new SoftReference<Cat>(cat);

// Now only the catRef soft reference points at the object
cat = null;

// Now the ordinary cat variable also references the object
cat = catRef.get();

// Clear the soft reference
catRef.clear();
"If the only references to an object are soft, then it continues to live and is called 'softly-reachable'."

Weak references
https://codegym.cc/quests/lectures/questcollections.level04.lecture05