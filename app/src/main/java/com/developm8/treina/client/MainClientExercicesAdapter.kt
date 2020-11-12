package com.developm8.treina.client

import android.app.AlertDialog
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.developm8.treina.R
import com.developm8.treina.model.Exercice
import com.google.android.material.button.MaterialButton

class MainClientExercicesAdapter(
    private val mDataset : ArrayList<Exercice>,
    private val layoutInflater: LayoutInflater
) : RecyclerView.Adapter<MainClientExercicesAdapter.BaseViewHolder<*>>() {

    abstract class BaseViewHolder<T>(itemView: View, layoutInflater: LayoutInflater) : RecyclerView.ViewHolder(itemView) {
        abstract fun bind(item: T)

        class ExerciceViewHolder(val view: View, val layoutInflater: LayoutInflater) : BaseViewHolder<Exercice>(view, layoutInflater) {
            private val exerciceName: TextView = view.findViewById(R.id.materialTextViewExerciceName)
            private val materialButtonDetails: MaterialButton = view.findViewById(R.id.materialButtonDetails)
            override fun bind(item: Exercice) {
                this.exerciceName.text = item.value
                materialButtonDetails.setOnClickListener {
                    val dialogBuilder: AlertDialog.Builder = AlertDialog.Builder(view.context)
                    val viewDialog: View = layoutInflater.inflate(R.layout.alert_dialog_client_exercice, null)
                    dialogBuilder.setView(viewDialog).setTitle("Detalles").setPositiveButton("Cerrar") { dialog, which -> dialog.dismiss() }
                    dialogBuilder.create().show()
                }
            }
        }

        class DayViewHolder(val view: View, val layoutInflater: LayoutInflater): BaseViewHolder<Exercice>(view, layoutInflater) {
            private val day: TextView = view.findViewById(R.id.textViewDay)
            override fun bind(item: Exercice) {
                this.day.text = item.value
            }
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BaseViewHolder<*> {
        if (viewType==0) {
            val view: View = LayoutInflater.from(parent.context).inflate(R.layout.item_main_client_exercices_day, parent, false)
            return BaseViewHolder.DayViewHolder(view, layoutInflater)
        } else {
            val view: View = LayoutInflater.from(parent.context).inflate(R.layout.item_main_client_exercices, parent, false)
            return BaseViewHolder.ExerciceViewHolder(view, layoutInflater)
        }
    }

    override fun onBindViewHolder(holder: BaseViewHolder<*>, position: Int) {
        val item = mDataset[position]
        when(holder){
            is BaseViewHolder.ExerciceViewHolder -> {
                holder.bind(item)
            }
            is BaseViewHolder.DayViewHolder -> {
                holder.bind(item)
            }
        }
    }

    override fun getItemCount(): Int {
        return mDataset.size
    }

    override fun getItemViewType(position: Int): Int {
        return if (mDataset.get(position).type == "day") {
            0
        } else {
            1
        }
    }

}