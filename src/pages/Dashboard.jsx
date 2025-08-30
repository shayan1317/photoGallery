import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useState, useEffect, useMemo } from "react";
import useStorage from "../components/hooks/useStorage";
import { projectStorage } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../firebase/config";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuth } from "../components/AuthProvider";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject } from "firebase/storage";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const fetchUrl = (file, setProgress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(projectStorage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(true); // 👈 progress while uploading
      },
      (error) => {
        reject(error); // 👈 upload failed
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url); // 👈 resolve only when finished
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};
function Dashboard() {
  const { user } = useAuth();
  const [progress, setProgress] = useState("");
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [url, setUrl] = useState(null);

  // Handle file selection
  const handleFileSelect = async (files) => {
    const imagesArray = Array.from(files);

    let newAddedImages = await Promise.all(
      imagesArray.map(async (file) => {
        if (file.type.startsWith("image/")) {
          let url = await fetchUrl(file, setProgress, setUrl);

          const userId = auth.currentUser?.uid; // 👈 check here
          if (!userId) {
            throw new Error("User not logged in");
          }
          setProgress(false);
          const docRef = await addDoc(collection(db, "files"), {
            url: url,
            createdAt: serverTimestamp(),
            userId: user.uid,
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + " MB",
            path: `files/${file.name}`, // 👈 save this too
          });

          // Use Firestore doc id instead of random
          return {
            id: docRef.id,
            url: url,
            name: file.name,
            size: (file.size / 1024).toFixed(2) + " KB",
            createdAt: new Date().toLocaleDateString(),
            userId: user.uid,
            path: `files/${file.name}`, // 👈 save this too
          };
        }
      })
    );

    setImages((prev) => [...prev, ...newAddedImages]);
    toast.success("Image added successfully", {
      position: "top-right",
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const logout = async () => {
    try {
      setError(null);
      localStorage.clear();
      await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  // Handle file input change
  const handleFileChange = (e) => {
    handleFileSelect(e.target.files);
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const deleteImage = async (id) => {
    console.log("id", id);
    const imageToDelete = images.find((img) => img.id === id);
    console.log("imageToDelete", imageToDelete);

    if (imageToDelete) {
      try {
        // ✅ Free memory if it was a blob URL
        if (imageToDelete.url.startsWith("blob:")) {
          URL.revokeObjectURL(imageToDelete.url);
        }

        // ✅ Delete from Firebase Storage (if path is stored)
        if (imageToDelete.path) {
          const fileRef = ref(projectStorage, imageToDelete.path);
          await deleteObject(fileRef);
        }

        // ✅ Delete from Firestore (if you’re storing image docs)
        if (imageToDelete.id) {
          await deleteDoc(doc(db, "files", imageToDelete.id));
        }
        toast.success("Image removed successfully", {
          position: "top-right",
          autoClose: 3000, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }

    // ✅ Return new state without the deleted image
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Calculate total size
  const totalSize = useMemo(
    () => images.reduce((total, img) => total + parseFloat(img.size), 0),
    [images.length]
  );

  const styles = {
    dashboard: {
      minHeight: "100vh",
      background: "#0a0a0b",
      color: "white",
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: "24px",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    header: {
      display: "flex",
      alignItems: "center",
      marginBottom: "32px",
    },
    logo: {
      width: "48px",
      height: "48px",
      background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      marginRight: "16px",
    },
    headerContent: {
      flex: 1,
    },
    title: {
      fontSize: "24px",
      fontWeight: "600",
      margin: "0 0 4px 0",
      color: "white",
    },
    subtitle: {
      fontSize: "14px",
      color: "#6b7280",
      margin: "0",
    },
    stats: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "24px",
      marginBottom: "40px",
    },
    statCard: {
      background: "#111111",
      border: "1px solid #1f1f1f",
      borderRadius: "12px",
      padding: "24px",
      display: "flex",
      alignItems: "center",
    },
    statIcon: {
      width: "40px",
      height: "40px",
      background: "rgba(139, 92, 246, 0.1)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "16px",
      fontSize: "18px",
    },
    statContent: {
      flex: 1,
    },
    statNumber: {
      fontSize: "24px",
      fontWeight: "600",
      color: "white",
      margin: "0 0 4px 0",
    },
    statLabel: {
      fontSize: "14px",
      color: "#6b7280",
      margin: "0",
    },
    uploadSection: {
      marginBottom: "48px",
    },
    uploadHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "24px",
    },
    uploadTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "white",
      margin: "0",
      display: "flex",
      alignItems: "center",
    },
    uploadIcon: {
      marginRight: "8px",
    },
    dragDropTag: {
      background: "rgba(139, 92, 246, 0.1)",
      color: "#8b5cf6",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "500",
      border: "1px solid rgba(139, 92, 246, 0.2)",
    },
    uploadArea: {
      border: dragActive ? "2px dashed #8b5cf6" : "2px dashed #333333",
      borderRadius: "16px",
      padding: "80px 40px",
      textAlign: "center",
      transition: "all 0.3s ease",
      cursor: "pointer",
      background: dragActive ? "rgba(139, 92, 246, 0.05)" : "transparent",
    },
    uploadCircle: {
      width: "80px",
      height: "80px",
      background: "rgba(139, 92, 246, 0.1)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 24px",
      fontSize: "24px",
      color: "#8b5cf6",
      transition: "all 0.3s ease",
    },
    uploadText: {
      fontSize: "20px",
      fontWeight: "600",
      color: "white",
      margin: "0 0 8px 0",
    },
    uploadSubtext: {
      fontSize: "14px",
      color: "#6b7280",
      margin: "0 0 32px 0",
    },
    browseBtn: {
      background: "rgba(139, 92, 246, 0.1)",
      color: "#8b5cf6",
      border: "1px solid rgba(139, 92, 246, 0.2)",
      padding: "12px 24px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "inline-flex",
      alignItems: "center",
    },
    fileInput: {
      display: "none",
    },
    gallerySection: {
      marginBottom: "48px",
    },
    galleryHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "32px",
    },
    galleryTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "white",
      margin: "0",
      display: "flex",
      alignItems: "center",
    },
    galleryIcon: {
      marginRight: "8px",
    },
    gallery: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "24px",
    },
    imageCard: {
      background: "#111111",
      border: "1px solid #1f1f1f",
      borderRadius: "12px",
      overflow: "hidden",
      transition: "all 0.3s ease",
      position: "relative",
      cursor: "pointer",
    },
    imageContainer: {
      position: "relative",
      paddingBottom: "75%",
      overflow: "hidden",
    },
    image: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.3s ease",
    },
    overlay: {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      background: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: "0",
      transition: "opacity 0.3s ease",
    },
    deleteBtn: {
      background: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "8px",
      width: "48px",
      height: "48px",
      fontSize: "18px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    imageInfo: {
      padding: "16px",
    },
    imageName: {
      fontSize: "14px",
      fontWeight: "500",
      color: "white",
      margin: "0 0 8px 0",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    imageDetails: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "12px",
      color: "#6b7280",
    },
    emptyState: {
      textAlign: "center",
      padding: "80px 40px",
    },
    emptyIcon: {
      width: "80px",
      height: "80px",
      background: "rgba(107, 114, 128, 0.1)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 24px",
      fontSize: "32px",
      color: "#4b5563",
    },
    emptyText: {
      fontSize: "20px",
      fontWeight: "600",
      color: "white",
      margin: "0 0 8px 0",
    },
    emptySubtext: {
      fontSize: "14px",
      color: "#6b7280",
      margin: "0",
    },
  };
  useEffect(() => {
    if (user) {
      const getUserFiles = async () => {
        try {
          const filesRef = collection(db, "files");
          const filter = query(filesRef, where("userId", "==", user.uid));
          const userFiles = await getDocs(filter);

          let allFiles = userFiles.docs?.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("allFilesfirst", allFiles);
          setImages(allFiles);
        } catch (Err) {
          console.log(Err);
        }
      };
      getUserFiles();
    }
  }, [user]);

  return (
    <div style={styles.dashboard}>
      {progress && <Loader />}
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>📷</div>
          <div style={styles.headerContent}>
            <h1 style={styles.title}>Image Storage</h1>
            <p style={styles.subtitle}>
              Upload, manage, and organize your images
            </p>
          </div>
          <button className="btn-primary" onClick={logout}>
            Logout
          </button>
        </div>

        {/* Stats */}
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📷</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>{images.length}</div>
              <div style={styles.statLabel}>Images</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>💾</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>{totalSize.toFixed(1)} KB</div>
              <div style={styles.statLabel}>Total Size</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⚡</div>
            <div style={styles.statContent}>
              <div style={styles.statNumber}>Ready</div>
              <div style={styles.statLabel}>Status</div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div style={styles.uploadSection}>
          <div style={styles.uploadHeader}>
            <h2 style={styles.uploadTitle}>
              <span style={styles.uploadIcon}>📤</span>
              Upload Images
            </h2>
            <div style={styles.dragDropTag}>Drag & Drop</div>
          </div>

          <div
            style={styles.uploadArea}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
            onMouseEnter={(e) => {
              if (!dragActive) {
                e.target.style.borderColor = "#4b5563";
                const circle = e.target.querySelector(".upload-circle");
                if (circle)
                  circle.style.background = "rgba(139, 92, 246, 0.15)";
              }
            }}
            onMouseLeave={(e) => {
              if (!dragActive) {
                e.target.style.borderColor = "#333333";
                const circle = e.target.querySelector(".upload-circle");
                if (circle) circle.style.background = "rgba(139, 92, 246, 0.1)";
              }
            }}
          >
            <div className="upload-circle" style={styles.uploadCircle}>
              📤
            </div>
            <h3 style={styles.uploadText}>Drop your images here</h3>
            <p style={styles.uploadSubtext}>
              Or click to browse files from your computer
            </p>
            <button
              style={styles.browseBtn}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(139, 92, 246, 0.15)";
                e.target.style.borderColor = "rgba(139, 92, 246, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(139, 92, 246, 0.1)";
                e.target.style.borderColor = "rgba(139, 92, 246, 0.2)";
              }}
            >
              📷 Browse Images
            </button>
            <input
              type="file"
              id="fileInput"
              multiple
              accept="image/*"
              style={styles.fileInput}
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Gallery Section */}
        <div style={styles.gallerySection}>
          <div style={styles.galleryHeader}>
            <h2 style={styles.galleryTitle}>
              <span style={styles.galleryIcon}>🖼️</span>
              Your Images
            </h2>
          </div>

          {images.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>👁️</div>
              <h3 style={styles.emptyText}>No images yet</h3>
              <p style={styles.emptySubtext}>
                Upload some images to get started
              </p>
            </div>
          ) : (
            <div style={styles.gallery}>
              {images.map((image) => (
                <div
                  key={image.id}
                  style={styles.imageCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = "#374151";
                    const img = e.currentTarget.querySelector("img");
                    const overlay = e.currentTarget.querySelector(".overlay");
                    if (img) img.style.transform = "scale(1.05)";
                    if (overlay) overlay.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "#1f1f1f";
                    const img = e.currentTarget.querySelector("img");
                    const overlay = e.currentTarget.querySelector(".overlay");
                    if (img) img.style.transform = "scale(1)";
                    if (overlay) overlay.style.opacity = "0";
                  }}
                >
                  <div style={styles.imageContainer}>
                    <img
                      src={image.url}
                      alt={image.name}
                      style={styles.image}
                    />
                    <div className="overlay" style={styles.overlay}>
                      <button
                        style={styles.deleteBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteImage(image.id);
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#dc2626";
                          e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "#ef4444";
                          e.target.style.transform = "scale(1)";
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div style={styles.imageInfo}>
                    <h4 style={styles.imageName}>{image.name}</h4>
                    <div style={styles.imageDetails}>
                      <span>{image.size}</span>
                      <span>{image.uploadDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
